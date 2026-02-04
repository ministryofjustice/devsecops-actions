import type { Config } from "@jest/types";

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageReporters: ["text", "text-summary"],
  testTimeout: 20000, // 20 seconds
} as Config.InitialOptions;
