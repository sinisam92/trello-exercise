export default {
  testEnvironment: "node",
  maxWorkers: 1,
  transform: {},
  moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "json", "node"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFilesAfterEnv: ["./tests/jest.setup.js"],
  testSequencer: "./tests/custom-sequencer.cjs",
};
