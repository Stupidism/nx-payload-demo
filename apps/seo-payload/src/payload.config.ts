import path from 'path';

import _ from 'lodash';
import s3Upload from 'payload-s3-upload';
import { buildConfig } from 'payload/config';

import babelConfig from '../babel.config';

import { Users } from './collections/Users';
import { environment } from './environments/environment';

const bullMockPath = path.resolve(__dirname, '../../../apps/seo-payload/src/mocks/client-side-bull-mock.ts');

export default buildConfig({
  serverURL: environment.payload.serverUrl,
  admin: {
    // the user collection slug to use for authenticating to the admin panel, one per express app
    user: Users.slug,
    webpack: (config) => {
      return _.merge({}, config, {
        // Uncomment this to write code to patch-package payload, otherwise everything is cached
        // cache: false,
        module: {
          rules: [
            {
              // Override the babel loader
              // test: /\.(t|j)sx?$/,
              // exclude: /node_modules[\\/](?!(@payloadcms[\\/]payload)[\\/]).*/,
              use: [
                {
                  // loader: 'babel-loader',
                  options: babelConfig,
                },
              ],
            },
          ],
        },
        resolve: {
          alias: {
            react: path.resolve(__dirname, '../../../node_modules/payload/node_modules/react'),
            'react-dom': path.resolve(__dirname, '../../../node_modules/payload/node_modules/react-dom'),
            bull: bullMockPath,
          },
        },
      });
    },
    components: {},
  },
  collections: [Users],
  typescript: {
    outputFile: 'libs/payload-types/src/generated/payload-types.ts',
  },
  graphQL: {
    disablePlaygroundInProduction: environment.deployEnv === 'prod',
  },

  // for migrating cold data, set rate limit with larger number
  rateLimit: { window: 1000, max: 500 },

  plugins: [
    s3Upload({
      credentials: {
        accessKeyId: environment.aws.key,
        secretAccessKey: environment.aws.secret,
      },
    }),
  ],
});
