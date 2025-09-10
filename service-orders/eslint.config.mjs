import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    ignores: ["dist", "node_modules", "**/*.md", "**/*.MD"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
      "camelcase": "off",
      "no-useless-constructor": "off",
    },
  },
];
