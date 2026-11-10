module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  moduleFileExtensions: ["ts", "js"],
  moduleDirectories: ["node_modules", "src"],
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
}