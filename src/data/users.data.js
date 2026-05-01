// @ts-check

const validCredentials = {
  username: 'emilys',
  password: 'emilyspass',
};

const invalidCredentials = {
  wrongPassword: { username: 'emilys', password: 'wrongpass' },
  unknownUser: { username: 'no_such_user_xyz', password: 'whatever' },
  emptyUsername: { username: '', password: 'emilyspass' },
  emptyPassword: { username: 'emilys', password: '' },
};

const newUserPayload = {
  firstName: 'Temp',
  lastName: 'Ovi',
  age: 30,
};

const updateUserPayload = {
  firstName: 'TempUpdated',
};

const targetUserId = 2;

module.exports = {
  validCredentials,
  invalidCredentials,
  newUserPayload,
  updateUserPayload,
  targetUserId,
};
