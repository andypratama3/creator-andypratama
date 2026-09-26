import coreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypeScript from "eslint-config-next/typescript"

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "next-env.d.ts"],
  },
  ...coreWebVitals,
  ...nextTypeScript,
  {
    rules: {
      // Unused args prefixed with _ are intentional (signature compatibility).
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "none" },
      ],
      // Server logs are intentional; stray client-side logging is not.
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    },
  },
]

export default eslintConfig
