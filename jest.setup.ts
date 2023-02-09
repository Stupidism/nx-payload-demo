import nock from 'nock';
import v8 from 'node:v8';

v8.setFlagsFromString('--expose-gc');

// https://github.com/prisma/prisma/issues/8558
global.setImmediate = ((global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args))) as unknown) as typeof setImmediate;

// Increase default timeout for jest
jest.setTimeout(30000);

beforeAll(async () => {
  /**
   * Disable net connect globally to make sure no app or lib has tests reaching out
   * https://github.com/nock/nock#enabledisable-real-http-requests
   */
  nock.disableNetConnect();
  // Allow localhost connections so we can test local routes and mock servers.
  nock.enableNetConnect('127.0.0.1');
});

afterAll(async () => {
  nock.restore();
  jest.clearAllMocks();
  global.gc && global.gc();
});
