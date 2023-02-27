module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ["lcov"],
  testMatch: ['**/__tests__/**/*.test.ts']
}