// @ts-check
const { logger } = require('../utils/logger');

/**
 * Base API class. All concrete API page objects extend this.
 * Provides shared HTTP verbs with logging, error capture, and consistent
 * return shape `{ status, headers, body, ok }`.
 */
class BaseApi {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    if (!request) {
      throw new Error('BaseApi requires a Playwright APIRequestContext');
    }
    this.request = request;
  }

  /**
   * @param {string} method
   * @param {string} url
   * @param {import('@playwright/test').APIRequestOptions} [options]
   */
  async _send(method, url, options = {}) {
    logger.info(`[${method}] ${url}`);
    const response = await this.request.fetch(url, { method, ...options });
    const body = await this._parseBody(response);
    const result = {
      status: response.status(),
      headers: response.headers(),
      body,
      ok: response.ok(),
    };
    logger.debug(`Response: ${result.status} - ${JSON.stringify(body).slice(0, 300)}`);
    return result;
  }

  /**
   * @param {import('@playwright/test').APIResponse} response
   */
  async _parseBody(response) {
    const text = await response.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  }

  get(url, options) {
    return this._send('GET', url, options);
  }

  post(url, data, options = {}) {
    return this._send('POST', url, { data, ...options });
  }

  put(url, data, options = {}) {
    return this._send('PUT', url, { data, ...options });
  }

  patch(url, data, options = {}) {
    return this._send('PATCH', url, { data, ...options });
  }

  delete(url, options) {
    return this._send('DELETE', url, options);
  }
}

module.exports = { BaseApi };
