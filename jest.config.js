/**
 * Jest Configuration
 *
 * This file configures Jest for testing Next.js applications.
 * It uses next/jest to handle Next.js-specific configuration.
 */

// Import the Next.js Jest configuration creator
import nextJest from "next/jest";

// Create a Jest configuration function with the Next.js app directory
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Setup files to run before each test
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Use jsdom as the test environment for browser-like testing
  testEnvironment: "jest-environment-jsdom",

  // Handle module aliases (like @/components) in tests
  moduleNameMapper: {
    // Handle module aliases
    "^@/(.*)$": "<rootDir>/$1",
  },

  // Paths to ignore when running tests
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
};

// Export the combined configuration
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
