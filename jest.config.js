module.exports = {
  preset: 'ts-jest',                     // Uses ts-jest to compile TypeScript
  testEnvironment: 'node',               // Node.js test environment
  setupFiles: ['<rootDir>/jest.setup.ts'], // Loads dotenv before tests
  roots: ['<rootDir>/tests'],            // Only look for test files in /tests
  collectCoverageFrom: [
    'src/**/*.ts',                        // Include all .ts files in src
    '!src/**/*.d.ts'                      // Ignore TypeScript declaration files
  ],
  coverageThreshold: {
    global: {                             // Enforce minimum coverage globally
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
