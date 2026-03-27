module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./tests/setup.js'], // Optional setup file
  testPathIgnorePatterns: ['/node_modules/'],
  verbose: true,
};
