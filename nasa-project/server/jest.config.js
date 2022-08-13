module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  testEnvironment: 'node',
  transform: {
    "\\.(js|jsx|ts|tsx)$": "@sucrase/jest-plugin"  
  }
};
