import { createTerminus } from '@godaddy/terminus';
import cors from 'cors';
import express from 'express';
import payload from 'payload';

import { environment } from './environments/environment';

const app = express();

// TODO: refactor, extract express server bootstrap.
// Redirect all traffic at root to admin UI
app.get('/', function (_, res) {
  res.redirect('/admin');
});

// increase request size limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use(
  '/api/graphql',
  cors((req, callback) => {
    const allowedOrigins = [new RegExp('http://localhost:4201')];
    const origin = req.headers.origin || '';

    callback(null, {
      origin: allowedOrigins.some((pattern) => pattern.test(origin)),
      credentials: true,
    });
  })
);

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET_KEY || 'SECRET_KEY',
  mongoURL: environment.mongodb.url,
  mongoOptions: {
    // FIXME: not sure if auto index is safe for us, but it should be consistent between stage and prod.
    autoIndex: true,
    dbName: environment.mongodb.databaseName,
  },
  express: app,
  onInit: async () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  },
});

const server = app.listen(environment.port);

/**
 * Fake health check. Always OK.
 * Waiting for reply from payload team.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
async function onHealthCheck() {}

createTerminus(server, {
  signal: 'SIGINT',
  healthChecks: { '/healthcheck': async () => onHealthCheck },
});

server.on('error', console.error);
