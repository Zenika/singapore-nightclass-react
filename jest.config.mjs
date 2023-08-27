import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  globals: {
    fetch: global.fetch,
  },
  testEnvironment: "jest-environment-jsdom",
};

export default createJestConfig(customJestConfig);
