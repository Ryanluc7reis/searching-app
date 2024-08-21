module.exports = {
  testEnvironment: "jest-environment-jsdom", // Certifique-se de que esta linha está correta
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Inclua isso se estiver usando o setup
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
