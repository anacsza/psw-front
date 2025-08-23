module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '\\.css$': '<rootDir>/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  types: ["jest", "node"]
};
