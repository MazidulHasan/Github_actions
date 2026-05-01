// @ts-check
const { test, expect } = require('../../src/fixtures/apiFixtures');
const { targetUserId, updateUserPayload } = require('../../src/data/users.data');

test.describe('Users - Update User', () => {
  test(`should update user id=${targetUserId} firstName`, async ({ userApi }) => {
    const response = await userApi.updateUser(targetUserId, updateUserPayload);

    expect(response.status).toBe(200);
    expect(response.ok).toBe(true);
    expect(response.body).toMatchObject({
      id: targetUserId,
      firstName: updateUserPayload.firstName,
    });
  });

  test(`should update multiple fields for user id=${targetUserId}`, async ({ userApi }) => {
    const payload = { firstName: 'Multi', lastName: 'Update', age: 42 };
    const response = await userApi.updateUser(targetUserId, payload);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: targetUserId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      age: payload.age,
    });
  });

  test('should fail to update a non-existent user', async ({ userApi }) => {
    const response = await userApi.updateUser(999999, { firstName: 'Ghost' });

    expect(response.ok).toBe(false);
    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});
