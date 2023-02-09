const fs = require('fs');
const nxPreset = require('@nrwl/jest/preset').default;
const merge = require('lodash/merge');

const tsConfig = require('./tsconfig.base.json');
const swcConfigJson = JSON.parse(fs.readFileSync(__dirname + '/.swcrc'));

const swcConfig = merge(swcConfigJson, {
  jsc: {
    paths: tsConfig.compilerOptions.paths,
  },
});

((swcConfig.jsc ??= {}).experimental ??= {}).plugins = [['jest_workaround', {}]];

module.exports = {
  ...nxPreset,
  moduleNameMapper: {
    '^uuid$': require.resolve('uuid'),
    '^msgpackr$': require.resolve('msgpackr'),
    '^typeorm$': require.resolve('typeorm'),
    // fix for aws-jwt-verify in jest
    // ref: https://github.com/awslabs/aws-jwt-verify/issues/66
    '#node-web-compat': './node-web-compat-node.js',
  },
  snapshotFormat: {
    escapeString: true,
    printBasicPrototype: true,
  },
  transform: {
    '^.+\\.[tj]sx?$': ['@swc/jest', swcConfig],
  },
  setupFilesAfterEnv: ['<rootDir>/../../jest.setup.ts'],
  coverageReporters: ['html', 'json', 'text'],
};
