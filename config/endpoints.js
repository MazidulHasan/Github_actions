// @ts-check

const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    me: '/auth/me',
    refresh: '/auth/refresh',
  },
  users: {
    base: '/users',
    add: '/users/add',
    byId: (id) => `/users/${id}`,
  },
};

module.exports = { ENDPOINTS };
