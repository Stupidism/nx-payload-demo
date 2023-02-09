const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (configFile) => ({
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
            loader: 'ts-loader',
            options: {
              ...(configFile ? { configFile } : {}),
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
});
