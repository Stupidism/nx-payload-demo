export const environment = {
  production: false,
  deployEnv: 'development',
  port: 9101,
  previewHost: 'http://localhost:4201',
  mongodb: {
    url: 'mongodb://localhost:27017',
    databaseName: 'seo-payload',
  },
  payload: {
    serverUrl: 'http://localhost:9101',
  },
  aws: {
    s3UploadsBucket: 'xxx',
    key: process.env.AWS_KEY,
    secret: process.env.AWS_SECRET,
  },
};

export type Environment = typeof environment;
