<template>
  <div class="d-flex justify-center">
    <LineChart
      title="روند میانگین نرخ سود پیش‌بینی شده در بازار تامین مالی جمعی"
      show-grid="true"
      show-tooltip="true"
      height="400"
      color="#1E64E9"
      :data="data"
    />
  </div>
</template>

<script setup>
import LineChart from "@/components/LineChart.vue";
import { ref } from "vue";

const data = ref([
  {
    month: "فروردین",
    value: 10,
    year: 1404,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "اردیبهشت",
    value: 30,
    year: 1404,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "خرداد",
    value: 45,
    year: 1404,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "تیر",
    value: 25,
    year: 1404,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "مرداد",
    value: 55,
    year: 1404,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "شهریور",
    value: 35,
    year: 1404,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "مهر",
    value: 70,
    year: 1404,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "آبان",
    value: 40,
    year: 1404,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "آذر",
    value: 65,
    year: 1404,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  { month: "دی", value: 50, year: 1404 },
  {
    month: "بهمن",
    value: 75,
    year: 1404,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "اسفند",
    value: 60,
    year: 1404,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  // سال دوم
  {
    month: "فروردین",
    value: 55,
    year: 1405,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "اردیبهشت",
    value: 65,
    year: 1405,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "خرداد",
    value: 45,
    year: 1405,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "تیر",
    value: 35,
    year: 1405,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "مرداد",
    value: 70,
    year: 1405,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "شهریور",
    value: 60,
    year: 1405,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "مهر",
    value: 80,
    year: 1405,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "آبان",
    value: 50,
    year: 1405,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "آذر",
    value: 75,
    year: 1405,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "دی",
    value: 65,
    year: 1405,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "بهمن",
    value: 85,
    year: 1405,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
  {
    month: "اسفند",
    value: 70,
    year: 1405,
    weeks: [
      { week: 1, value: 40 },
      { week: 2, value: 50 },
      { week: 3, value: 45 },
      { week: 4, value: 55 },
    ],
  },
]);
</script>

<style scoped>
:deep(*) {
  font-family: "IRANSans", sans-serif;
}
</style>
