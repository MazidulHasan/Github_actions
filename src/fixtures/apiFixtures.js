// @ts-check
const base = require('@playwright/test');
const { AuthApi } = require('../api/AuthApi');
const { UserApi } = require('../api/UserApi');
const { validCredentials } = require('../data/users.data');

/**
 * Custom Playwright fixtures.
 *
 * Exposes:
 *   - authApi:   Auth endpoints (login, refresh, me)
 *   - userApi:   User CRUD endpoints
 *   - authToken: Pre-logged-in access token using validCredentials
 *   - authedRequest: APIRequestContext with Authorization header pre-applied
 */
const test = base.test.extend({
  authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },

  userApi: async ({ request }, use) => {
    await use(new UserApi(request));
  },

  authToken: async ({ authApi }, use) => {
    const response = await authApi.login(validCredentials);
    if (!response.ok || !response.body?.accessToken) {
      throw new Error(
        `Auth fixture failed to obtain token. status=${response.status} body=${JSON.stringify(response.body)}`,
      );
    }
    await use(response.body.accessToken);
  },

  authedRequest: async ({ playwright, authToken }, use) => {
    const ctx = await playwright.request.newContext({
      baseURL: base.test.info().project.use.baseURL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });
    await use(ctx);
    await ctx.dispose();
  },
});

module.exports = {
  test,
  expect: base.expect,
};
