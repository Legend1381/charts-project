import baseConfig from "eslint-config-vuetify";

export default [
  ...baseConfig,
  {
    rules: {
      "@stylistic/quotes": ["error", "double"],
      "vue/script-indent": [
        "error",
        2,
        {
          baseIndent: 0,
          switchCase: 0,
          ignores: [],
        },
      ],
      "vue/attributes-order": "warn",
      "vue/order-in-components": "warn",
    },
  },
];
