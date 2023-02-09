const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  setupFilesAfterEnv: ['<rootDir>/../../jest.setup.ts'],
  coverageReporters: ['html', 'json', 'text'],
};
