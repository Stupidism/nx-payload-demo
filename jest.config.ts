const { getJestProjects } = require('@nrwl/jest');

export default {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/headless-puppeteer-2-layer',
    '<rootDir>/apps/metabase-server',
    '<rootDir>/apps/clickhouse',
    '<rootDir>/apps/perfectish-font-fallbacks',
    '<rootDir>/apps/growthbook',
    '<rootDir>/apps/statping',
  ],
};
