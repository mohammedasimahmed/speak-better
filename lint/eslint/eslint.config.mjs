// eslint.config.mjs

import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { commonRules } from "./eslint-rules.mjs";
import { eslintIgnore } from "./eslint-ignore.mjs";

export default defineConfig([
  // Frontend config
  {
    ignores: eslintIgnore
  },
  {
    files: ["apps/frontend/**/*.{js,ts,jsx,tsx}"],
    plugins: {
      js,
      react: pluginReact,
    },
    extends: ["js/recommended"],
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
  tseslint.configs.recommended,
  {
    files: ["apps/frontend/**/*.{js,ts,jsx,tsx}"],
    rules: {
      ...commonRules,
      "no-console": "warn",
      "react/react-in-jsx-scope": "off"
    },
  },

  // Backend config
  {
    files: ["apps/backend/**/*.{js,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
    },
    rules: commonRules,
  },

  // Backend cache config
  {
    files: ["apps/backend-cache/**/*.{js,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.node,
    },
    rules: commonRules,
  },
]);
