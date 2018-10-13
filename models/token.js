const database = require('../database');

class Token {
    constructor(tokenId, user_id, created_at, active, expires, type) {
        this.tokenId = tokenId;
        this.user_id = user_id;
        this.created_at = created_at;
        this.active = active;
        this.expires = expires;
        this.type = type;
    }

    static async create({created_at, user_id, active, expires, type}){
      let response = await database.insert('tokens', {user_id, created_at, active, expires, type});

      const id = response.insertId;
      if (id > 0){
        return new Token({user_id, created_at, active, expires, type});
      }
      return [];
    }

    static async modify(tokenId, {user_id, created_at, active, expires, type}) {
        const data = await database.update('tokens', tokenId, {user_id, created_at, active, expires, type});
        return data;
    }

    static async getActive(tokenId) {
        const data = await database.selectActiveToken(tokenId);
        return data;
    }

    static async changeActive(tokenId) {
        const data = await database.changeActive('tokens', tokenId);
        return data;
    }

  }

module.exports = Token;
