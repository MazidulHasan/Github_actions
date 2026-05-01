// @ts-check
const { test, expect } = require('../../src/fixtures/apiFixtures');
const { targetUserId } = require('../../src/data/users.data');

test.describe('Users - Get User', () => {
  test(`should fetch user by id=${targetUserId}`, async ({ userApi }) => {
    const response = await userApi.getUserById(targetUserId);

    expect(response.status).toBe(200);
    expect(response.ok).toBe(true);
    expect(response.body).toMatchObject({ id: targetUserId });
    expect(response.body).toHaveProperty('firstName');
    expect(response.body).toHaveProperty('lastName');
    expect(response.body).toHaveProperty('email');
  });

  test('should return 404 for non-existent user id', async ({ userApi }) => {
    const response = await userApi.getUserById(999999);

    expect(response.status).toBe(404);
    expect(response.ok).toBe(false);
    expect(response.body).toHaveProperty('message');
  });

  test('should fetch a paginated list of users', async ({ userApi }) => {
    const response = await userApi.getAllUsers({ limit: 5, skip: 0 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('users');
    expect(Array.isArray(response.body.users)).toBe(true);
    expect(response.body.users.length).toBeLessThanOrEqual(5);
    expect(response.body).toHaveProperty('total');
  });
});
