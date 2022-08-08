/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.js"],
  transform: {
    "\\.(js|ts|tsx)$": "babel-jest",
    "\\.svg$": "<rootDir>/__mocks__/svg.js",
  },
  moduleNameMapper: {
    uuid: require.resolve("uuid"),
    "\\.css$": "identity-obj-proxy",
  },
};
