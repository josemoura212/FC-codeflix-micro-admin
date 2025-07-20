import type { Config } from 'jest';

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
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov', 'html', 'clover'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  rootDir: './src',

  setupFilesAfterEnv: ['./core/shared/infra/testing/expect-helpers.ts'],

  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

export default config;
