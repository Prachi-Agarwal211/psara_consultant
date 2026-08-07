import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored / tooling folders — not app source:
    ".agents/**",
    ".grok/**",
    "ai research prompts/**",
    "research/**",
    "scripts/**",
    "cypress/**",
    // Minified third-party vendor libs:
    "public/assets/libs/**",
  ]),
]);

export default eslintConfig;
