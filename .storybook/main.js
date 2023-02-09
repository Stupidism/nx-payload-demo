module.exports = {
  stories: [],
  addons: [
    {
      name: 'storybook-addon-swc',
      options: {
        enableSwcMinify: false,
        swcLoaderOptions: {
          jsc: {
            externalHelpers: false,
          },
          sourceMaps: false,
        },
      },
    },
    '@nrwl/react/plugins/storybook',
    '@storybook/addon-essentials',
  ],
  webpackFinal: async (config, { configType }) => {
    return config;
  },
};
