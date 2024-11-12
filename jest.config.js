export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"],
  transform: {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!variables/.*)"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/src/tests/mocks/files/styleMock.js",
  },
};
