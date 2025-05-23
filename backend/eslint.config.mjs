import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "module", globals:globals.node } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  {
    // Add a specific configuration for test files
    files: ["**/*.test.js", "**/tests/**/*.js"], // Specify test file pattern
    languageOptions: { globals:globals.jest }
  },
  
]);