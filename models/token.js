const database = require('../database');

class Token {
    constructor(id, user_id, created_at, active, expires, type) {
        this.id = id;
        this.user_id = user_id;
        this.created_at = created_at;
        this.active = active;
        this.expires = expires;
        this.type = type;
    }

    /**
     * Creates a new token
     * @param  {Int}  user_id     [Id from the user who created the token]
     * @param  {Date}  created_at     [When was created the token]
     * @param  {Int}  expires [Time when the token will expire]
     * @param {Char} type [Type of token]
     * @return {Promise}          [return a new token]
     */
    static async create(user_id, expires, type){
      let response = await database.insert('tokens', {user_id, expires , type});

      const id = response.insertId;
      if (id > 0){
        return new Token({user_id, type});
      }
      return [];
    }
    /**
     *
     * Gets an active token
     * @param {Int} tokenId [Id from the token]
     * @return {Promise}
     */
    static async getActive(userId) {
        const data = await database.selectActiveToken(userId);
        return data;
    }

    static async changeActive(tokenId) {
        const data = await database.changeActive('tokens', tokenId);
        return data;
    }

  }

module.exports = Token;
