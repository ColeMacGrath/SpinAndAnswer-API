const database = require('../database');

class Token {
    constructor(tokenId, created_at, user_id, active, expires, type) {
        this.tokenId = tokenId;
        this.created_at = created_at;
        this.user_id = user_id;
        this.active = active;
        this.expires = expires;
        this.type = type;
    }

    static async create({created_at, user_id, active, expires, type}){
      let response = await database.insert('token', {created_at, user_id, active, expires, type});

      const id = response.insertId;
      if (id > 0){
        return new Token({created_at, user_id, active, expires, type});
      }
      return [];
    }

    static async modify(tokenId, {created_at, user_id, active, expires, type }) {
        const data = await database.update('token', tokenId, { created_at, user_id, active, expires, type });
        return data;
    }

    static async getActive(tokenId) {
        const data = await database.selectActiveToken('token', tokenId);
        return data;
    }

    static async changeActive(tokenId) {
        const data = await database.changeActive('token', tokenId);
        return data;
    }



  }

module.exports = Token;
