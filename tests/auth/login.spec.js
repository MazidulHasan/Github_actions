// @ts-check
const { test, expect } = require('../../src/fixtures/apiFixtures');
const { validCredentials, invalidCredentials } = require('../../src/data/users.data');

test.describe('Auth - Login', () => {
  test('should login successfully with valid credentials', async ({ authApi }) => {
    const response = await authApi.login(validCredentials);

    expect(response.status, 'Login should return 200').toBe(200);
    expect(response.ok).toBe(true);
    expect(response.body).toMatchObject({
      username: validCredentials.username,
    });
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
    expect(typeof response.body.accessToken).toBe('string');
    expect(response.body.accessToken.length).toBeGreaterThan(10);
  });

  test('should fail to login with wrong password', async ({ authApi }) => {
    const response = await authApi.login(invalidCredentials.wrongPassword);

    expect(response.ok).toBe(false);
    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.body).toHaveProperty('message');
  });

  test('should fail to login with unknown user', async ({ authApi }) => {
    const response = await authApi.login(invalidCredentials.unknownUser);

    expect(response.ok).toBe(false);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test('should fail to login with empty password', async ({ authApi }) => {
    const response = await authApi.login(invalidCredentials.emptyPassword);

    expect(response.ok).toBe(false);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });

  test('should expose authToken via fixture', async ({ authToken }) => {
    expect(authToken).toBeTruthy();
    expect(typeof authToken).toBe('string');
  });
});
