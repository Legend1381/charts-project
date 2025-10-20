<template>
  <v-card class="card px-5" rounded="xl" variant="elevated">
    <v-card-title class="mb-n8 text-start" dir="rtl"> {{ props.title }} </v-card-title>
    <v-card-text class="overflow-x-scroll pa-0">
      <div ref="chart" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import * as d3 from "d3";
import { onMounted, ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    requird: true,
  },
  showTooltip: {
    type: Boolean,
    requird: true,
  },
  showGrid: {
    type: Boolean,
    requird: true,
  },
  height: {
    type: Number,
    requird: true,
  },
  color: {
    type: String,
    requird: true,
  },
  data: {
    type: Array,
    requird: true,
  },
});

const chart = ref(null);

onMounted(() => {
  // داده‌ها: ماه + مقدار + سال

  const margin = { top: 40, right: 40, bottom: 100, left: 60 };
  const width = 1000 - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;

  const svg = d3
    .select(chart.value)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // محور X بر اساس اندیس داده‌ها
  const xScale = d3
    .scalePoint()
    .domain(props.data.map((d, i) => i))
    .range([0, width])
    .padding(0.5);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(props.data, (d) => d.value)])
    .range([height, 0]);

  // خط نمودار
  const line = d3
    .line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d.value))
    .curve(d3.curveMonotoneX);

  // محور Y و خطوط grid
  svg
    .append("g")
    .call(
      d3
        .axisLeft(yScale)
        .ticks(10)
        .tickFormat((d) => `${d}%`)
        .tickSize(props.showGrid ? -width : 0)
        .tickPadding(10)
    )
    .attr("class", "grid")
    .selectAll("path")
    .style("display", "none");

  // خط اصلی با انیمیشن
  svg
    .append("path")
    .datum(props.data)
    .attr("fill", "none")
    .attr("stroke", props.color)
    .attr("stroke-width", 3)
    .attr("d", line)
    .attr("stroke-dasharray", function () {
      const length = this.getTotalLength();
      return `${length} ${length}`;
    })
    .attr("stroke-dashoffset", function () {
      return this.getTotalLength();
    })
    .transition()
    .duration(2000)
    .ease(d3.easeCubic)
    .attr("stroke-dashoffset", 0);

  // نقاط داده
  svg
    .selectAll("circle")
    .data(props.data)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", (d) => yScale(d.value))
    .attr("r", 4)
    .attr("fill", props.color);

  svg
    .selectAll(".grid line")
    .style("stroke", "#cfcfcf")
    .style("stroke-dasharray", "4 6")
    .style("opacity", 0.5)
    .style("shape-rendering", "crispEdges");

  // محور ماه‌ها
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(
      d3
        .axisBottom(xScale)
        .tickFormat((d, i) => props.data[i].month)
        .tickSize(0)
    )
    .call((g) => g.select(".domain").remove())
    .selectAll("text")
    .attr("text-anchor", "start")
    .attr("transform", "rotate(90)")
    .attr("x", 10)
    .attr("y", -5);

  // محور سال‌ها: داینامیک
  const yearGroups = d3.groups(props.data, (d) => d.year); // [[1404, [...]], [1405, [...]]]

  svg
    .append("g")
    .selectAll("line")
    .data(yearGroups)
    .enter()
    .append("line")
    .attr("x1", ([year, months]) =>
      xScale(props.data.indexOf(months[months.length - 1]))
    )
    .attr("y1", height + 65) // شروع خط پایین محور ماه‌ها
    .attr("y2", height + 65) // خط افقی
    .attr("stroke", "#cfcfcf")
    .attr("stroke-width", 1)
    .style("stroke-dasharray", "4 4");

  svg
    .append("g")
    .attr("transform", `translate(0,${height + 85})`)
    .selectAll("text")
    .data(yearGroups)
    .enter()
    .append("text")
    .attr("x", ([year, months]) => {
      const firstIndex = props.data.indexOf(months[0]);
      const lastIndex = props.data.indexOf(months[months.length - 1]);
      return (xScale(firstIndex) + xScale(lastIndex)) / 2;
    })
    .attr("y", 0)
    .attr("text-anchor", "middle")
    .text(([year]) => year)
    .style("font-weight", "bold")
    .style("font-size", "14px");

  // خطوط عمودی بین سال‌ها
  for (let i = 1; i < yearGroups.length; i++) {
    const prevYearMonths = yearGroups[i - 1][1];
    const x =
      xScale(props.data.indexOf(prevYearMonths[prevYearMonths.length - 1])) +
      (xScale.step ? xScale.step() / 2 : 0); // وسط بین آخرین ماه سال قبلی و اولین ماه سال بعدی
    svg
      .append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", height + 65)
      .attr("y2", height + 95)
      .attr("stroke", "#cfcfcf")
      .attr("stroke-width", 1)
      .style("stroke-dasharray", "4 4");
  }

  if (props.showTooltip) {
    // 🟦 Tooltip
    const tooltip = d3
      .select(chart.value)
      .append("div")
      .style("position", "fixed")
      .style("background", "white")
      .style("border", "1px solid #ddd")
      .style("border-radius", "8px")
      .style("padding", "8px 12px")
      .style("box-shadow", "0 2px 8px rgba(0,0,0,0.15)")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("direction", "rtl")
      .style("font-family", "IRANSans, sans-serif")
      .style("font-size", "13px");

    // دایره‌ی فوکوس (دایره بزرگ‌تر هنگام hover)
    const focusCircle = svg
      .append("circle")
      .attr("r", 6)
      .attr("fill", props.color)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .style("opacity", 0);

    // ✅ رفتار Hover برای هر دایره (نه کل مستطیل)
    svg
      .selectAll("circle")
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("r", 8)
          .attr("fill", props.color);
        tooltip.style("opacity", 1).html(`
          <div style="display:flex;flex-direction:column;gap:6px;font-size:13px;">
            <strong>${d.month} ${d.year}</strong>
            <div class="mini-chart"></div>
            <div style="display:flex;flex-direction:column;gap:3px;">
              ${d.weeks
                .map(
                  (w) => `
                <div style="display:flex;justify-content:space-between;">
                  <span>هفته ${w.week}</span>
                  <span>${w.value}%</span>
                </div>`
                )
                .join("")}
            </div>
          </div>
        `);
        const miniData = d.weeks;
        const miniWidth = 120;
        const miniHeight = 40;

        const xMini = d3
          .scaleLinear()
          .domain([1, miniData.length])
          .range([0, miniWidth]);

        const yMini = d3
          .scaleLinear()
          .domain([0, d3.max(miniData, (w) => w.value)])
          .range([miniHeight, 0]);

        const miniLine = d3
          .line()
          .x((w) => xMini(w.week))
          .y((w) => yMini(w.value))
          .curve(d3.curveMonotoneX);

        const miniSvg = d3
          .select(".mini-chart")
          .append("svg")
          .attr("width", miniWidth)
          .attr("height", miniHeight);

        // ✅ تعریف گرادیان زیر خط
        const defs = miniSvg.append("defs");

        const gradient = defs
          .append("linearGradient")
          .attr("id", "mini-gradient")
          .attr("x1", "0%")
          .attr("y1", "0%")
          .attr("x2", "0%")
          .attr("y2", "100%");

        gradient
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", props.color)
          .attr("stop-opacity", 0.4);

        gradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "#ffffff")
          .attr("stop-opacity", 0);

        // ✅ رسم ناحیه گرادیان زیر خط
        const area = d3
          .area()
          .x((w) => xMini(w.week))
          .y0(miniHeight)
          .y1((w) => yMini(w.value))
          .curve(d3.curveMonotoneX);

        miniSvg
          .append("path")
          .datum(miniData)
          .attr("fill", "url(#mini-gradient)")
          .attr("d", area);

        // ✅ رسم خود خط روی گرادیان
        miniSvg
          .append("path")
          .datum(miniData)
          .attr("fill", "none")
          .attr("stroke", props.color)
          .attr("stroke-width", 2)
          .attr("d", miniLine);
      })
      .on("mousemove", function (event, d) {
        tooltip
          .style("left", `${event.pageX - 170}px`)
          .style("top", `${event.pageY - 70}px`);
      })
      .on("mouseleave", function () {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("r", 4)
          .attr("fill", props.color);

        focusCircle.style("opacity", 0);
        tooltip.style("opacity", 0);
      });
  }
});
</script>

<style scoped>
svg {
  font-family: "IRANSans", sans-serif;
  direction: rtl;
}

.card {
  width: 700px;
}
</style>
