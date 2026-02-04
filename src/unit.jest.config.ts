import type { Config } from "@jest/types";

export default {
  preset: "ts-jest",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageReporters: ["text", "text-summary"],
  testTimeout: 20000, // 20 seconds
} as Config.InitialOptions;
