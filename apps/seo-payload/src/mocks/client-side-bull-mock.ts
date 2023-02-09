/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * Bull is a server side package, which will cause error when webpack try to bundle it.
 * So make this do nothing mock.
 */
export default class {
  process() {}
  addBulk() {}
}
