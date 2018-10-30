const database = require('../database');

class Token {
  constructor(id, userId, createdAt, expires, type, active) {
    this.id = id;
    this.userId = userId;
    this.createdAt = createdAt;
    this.expires = expires;
    this.type = type;
    this.active = active;
  }

  static async create(user_id, type, expires) {
    try {
      let data = await database.insert('tokens',{user_id, type, expires});
      return new Token({user_id, type, expires});
    } catch (e) {
      throw e;
    }
  }

  static async changeActive(tokenId) {
    try {
      let data = await database.changeActive('tokens', tokenId);
      return data;
    } catch (e) {
      throw e;
      return [];
    }
  }

  static async get(userId, type, active) {
    try {
      let data = await database.getToken(userId, type, active);
      return data.length !== 0 ? new Token (data) : false;
    } catch (e) {
      throw e;
    }
  }

  static async getTokenBy(id) {
    try {
      let data = await database.singleSelect('tokens', id);
      return data.length !== 0 ? new Token (data) : false;
    } catch (e) {
      throw e;
    }
  }

}

module.exports = Token;
