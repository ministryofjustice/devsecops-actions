import config from "@ministryofjustice/eslint-config-hmpps";

const base = config();

export default [
  ...base,
  // Ignore directories
  {
    ignores: ["dist/"],
  },
  // Override configurations
  {
    rules: {
      "no-console": ["error", { allow: ["info", "warn", "error"] }],
      semi: "error",
      "prettier/prettier": [
        "warn",
        {
          semi: true,
        },
      ],
    },
  },
];
