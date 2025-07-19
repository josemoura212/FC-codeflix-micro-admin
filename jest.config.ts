import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  
  // Coverage configuration
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
    '!<rootDir>/**/*.d.ts',
    '!<rootDir>/**/__tests__/**',
    '!<rootDir>/**/__test__/**',
    '!<rootDir>/**/*.spec.ts',
    '!<rootDir>/**/*.test.ts',
    '!<rootDir>/**/*.int-spec.ts',
    '!<rootDir>/**/testing/**',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: "v8",
  coverageReporters: [
    'text',
    'lcov',
    'html',
    'clover'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  rootDir: "./src",
  
  setupFilesAfterEnv: [
    "./shared/infra/testing/expect-helpers.ts",
  ],

  testMatch: [
    "**/__tests__/**/*.spec.ts",
    "**/__test__/**/*.spec.ts",
    "**/?(*.)+(spec|test|int-spec).ts"
  ],

  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
};

export default config;
