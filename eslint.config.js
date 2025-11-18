import js from "@eslint/js";
import ts from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";

export default [
  {
    ignores: ["dist", "node_modules"],
  },

  js.configs.recommended,
  ...ts.configs.recommended,
  {
    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
    },

    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-require-imports": "off",
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
