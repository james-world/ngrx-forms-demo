module.exports = {
  coverageReporters: ['html', 'text', 'text-summary'],
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  testMatch: ['<rootDir>/src/**/*.steps.ts', '<rootDir>/src/**/*.spec.ts'],
};
