const database = require('../database');

class Token {
  constructor(id, userId, createdAt, expires, type, active, token) {
    this.id = id;
    this.userId = userId;
    this.createdAt = createdAt;
    this.expires = expires;
    this.type = type;
    this.active = active;
    this.token = token;
  }

  static async create(user_id, type, expires, token) {
    try {
      let data = await database.insert('tokens',{user_id, type, expires, token});
      return new Token({user_id, type, expires, token});
    } catch (e) {
      throw e;
    }
  }

  static async changeActive(tokenId) {
    try {
      let data = await database.update('tokens', `active = 0 WHERE token_id = ${tokenId}`);
      return data;
    } catch (e) {
      throw e;
      return [];
    }
  }

  static async get(userId, type, active) {
    try {
      let data = await database.select('*', 'tokens', `WHERE user_id = ${userId} AND type = '${type}' AND active = ${active}`);
      return data.length !== 0 ? new Token (data) : false;
    } catch (e) {
      throw e;
    }
  }

  static async getTokenBy(tokenHash) {
    try {
      let data = await database.select('*', 'tokens', `WHERE token = '${tokenHash}'`);
      return data.length !== 0 ? new Token (data) : false;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = Token;
