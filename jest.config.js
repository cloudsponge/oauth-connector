module.exports = {
  setupFiles: ['./jest-setup.js'],
  // node_modules is default.
  testPathIgnorePatterns: ['/node_modules/'],
  verbose: true,
  clearMocks: true,
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
}
