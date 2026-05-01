// @ts-check
const { BaseApi } = require('./BaseApi');
const { ENDPOINTS } = require('../../config/endpoints');

class AuthApi extends BaseApi {
  /**
   * Authenticates a user and returns the standard response shape.
   * @param {{ username: string, password: string, expiresInMins?: number }} credentials
   */
  async login(credentials) {
    return this.post(ENDPOINTS.auth.login, credentials);
  }

  /**
   * Fetches the currently authenticated user.
   * @param {string} accessToken
   */
  async getCurrentUser(accessToken) {
    return this.get(ENDPOINTS.auth.me, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  /**
   * Refreshes the access token.
   * @param {{ refreshToken: string, expiresInMins?: number }} payload
   */
  async refreshToken(payload) {
    return this.post(ENDPOINTS.auth.refresh, payload);
  }
}

module.exports = { AuthApi };
