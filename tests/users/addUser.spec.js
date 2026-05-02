// @ts-check
const { test, expect } = require('../../src/fixtures/apiFixtures');
const { newUserPayload } = require('../../src/data/users.data');
const { generateUser } = require('../../src/utils/dataGenerator');

test.describe('Users - Add User', () => {
  test('should add a new user with static payload', async ({ userApi }) => {
    const response = await userApi.addUser(newUserPayload);

    expect(response.status).toBe(201);
    expect(response.ok).toBe(true);
    expect(response.body).toMatchObject({
      firstName: newUserPayload.firstName,
      lastName: newUserPayload.lastName,
      age: newUserPayload.age,
    });
    expect(response.body).toHaveProperty('id');
  });

  test('should add a new user with dynamically generated payload', async ({ userApi }) => {
    const payload = generateUser();
    const response = await userApi.addUser(payload);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    });
    expect(response.body.id).toBeDefined();
  });

  test('should add user with only required fields (firstName)', async ({ userApi }) => {
    const response = await userApi.addUser({ firstName: 'MinimalUser' });
    console.log("Ai is awesome");
    
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ firstName: 'MinimalUser' });
  });
});
