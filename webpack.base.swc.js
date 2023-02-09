const path = require('path');
const slsw = require('serverless-webpack');
const fs = require('fs')
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (configFile, swcConfigFile) => {
  const swcConfigJson  = swcConfigFile ? JSON.parse(fs.readFileSync(swcConfigFile)) : {};
  return {
    target: 'node',
    externals: [nodeExternals()],
    devtool: 'source-map',
    entry: slsw.lib.entries,
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
      plugins: [new TsconfigPathsPlugin({ configFile })],
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          use: [
            {
              loader: 'swc-loader',
              options: {
                ...swcConfigJson,
              },
            },
          ],
        },
        {
          test: /\.key$/,
          use: [
            {
              loader: 'raw-loader',
            },
          ],
        },
      ],
    },
    plugins: [],
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    stats: 'minimal', // errors-only, minimal, none, normal, verbose
    output: {
      libraryTarget: 'commonjs',
      path: path.resolve(__dirname, 'tmp', '.webpack'),
      filename: '[name].js',
    },
  }
};
