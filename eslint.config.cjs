const js = require("@eslint/js");
const pluginVue = require("eslint-plugin-vue");
const prettier = require("eslint-config-prettier");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  prettier,

  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // console, localStorage, setTimeout и т.д.
        ...globals.node,    // module, require и т.д.
      },
    },
  },
];
