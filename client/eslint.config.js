import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3.1" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // disable prop type checking for whole project
      // "react/prop-types": "off",
      // enable stricter rule for JSX
    },
  },
  //   { files: ["**/*.{js,mjs,cjs,jsx}"] ,

  //     languageOptions: {
  //       globals: globals.browser,
  //     },

  //     rules: {
  //       "no-unused-vars": [
  //         "error",
  //         {
  //           args: "all",
  //           argsIgnorePattern: "^_",
  //           caughtErrors: "all",
  //           caughtErrorsIgnorePattern: "^_",
  //           destructuredArrayIgnorePattern: "^_",
  //           varsIgnorePattern: "^_",
  //           ignoreRestSiblings: true,
  //         },
  //       ],
  //     },
  //   pluginJs.configs.recommended,
  //   pluginReact.configs.flat.recommended
  // },
];
