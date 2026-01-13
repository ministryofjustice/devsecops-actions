module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageReporters: ["text", "text-summary"],
  testTimeout: 20000, // 20 seconds
};
