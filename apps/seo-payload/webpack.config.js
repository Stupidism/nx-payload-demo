// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = (config, _context) => {
  return {
    ...config,
    entry: {
      ...config.entry,
      config: './apps/seo-payload/src/payload.config.ts',
    },
    output: {
      ...config.output,
      filename: '[name].js',
    },
  };
};
