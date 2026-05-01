// @ts-check
const { BaseApi } = require('./BaseApi');
const { ENDPOINTS } = require('../../config/endpoints');

class UserApi extends BaseApi {
  /**
   * @param {string|number} userId
   */
  async getUserById(userId) {
    return this.get(ENDPOINTS.users.byId(userId));
  }

  async getAllUsers(params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? `${ENDPOINTS.users.base}?${query}` : ENDPOINTS.users.base;
    return this.get(url);
  }

  /**
   * @param {object} userPayload
   */
  async addUser(userPayload) {
    return this.post(ENDPOINTS.users.add, userPayload);
  }

  /**
   * @param {string|number} userId
   * @param {object} userPayload
   */
  async updateUser(userId, userPayload) {
    return this.put(ENDPOINTS.users.byId(userId), userPayload);
  }

  /**
   * @param {string|number} userId
   */
  async deleteUser(userId) {
    return this.delete(ENDPOINTS.users.byId(userId));
  }
}

module.exports = { UserApi };
