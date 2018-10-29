const database = require('../database');
const bcrypt = require('bcryptjs');

class User {
    constructor(id, name, mail, username, password, secondMail, admin, active) {
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.username = username;
        this.password = password;
        this.secondMail = secondMail;
        this.admin = admin;
        this.active = active;
    }

    /**
     * Gets every user
     * @return Promise [return users in JSON of database]
     */
    static async getAll() {
      try {
        const data = await database.selectAll('users');
        const response = [];
        data.forEach((r) => {
          response.push(new User(r));
        });
        return response;
      } catch (e) {
        throw e;
      }
    }

    /**
     * Get a single user
     * @param   Integer   userId [ID of user to get]
     * @return Promise        [Return user in JSON data]
     */
    static async get(userId) {
        try {
          const data = await database.singleSelect('users', userId);
          return data.length !== 0 ? new User(data) : false;
        } catch (e) {
          throw e;
        }
    }

    /**
     * Change status of user
     * @param   Integer   userId [ID of user to be changed]
     * @return Promise        [return modified data in JSON]
     */
    static async changeActive(userId) {
      try {
        const data = await database.changeActive('users', userId);
        return data;
      } catch (e) {
        throw e;
      }
    }

    /**
     * Creates a new user
     * @param   String   name     [name of new user]
     * @param   String   mail     [mail of new user]
     * @param   String   username [username of new user]
     * @param   String   password [password of new user]
     * @return Promise          [return a new user]
     */
    static async create({name, mail, username, password, second_mail}){
      password = bcrypt.hashSync(String(password));
      try {
        let response = await database.insert('users', {name, mail, username, password, second_mail});

        const id = response.insertId;
        if (id > 0){
          return new User({id, name, mail, username, password, second_mail});
        }
        return [];
      } catch (e) {
        throw e;
      }
    }

    /**
     * Modifies an existent user
     * @param   Integer   userId   [Int]
     * @param   String   name     [String]
     * @param   String   mail     [String]
     * @param   String   username [String]
     * @param   String   password [String]
     * @param   Integer   admin    [Int]
     * @param   Integer   active   [Int]
     * @return Promise          [Return modified data]
     */
    static async modify(userId, { name, mail, username, password, second_mail, admin, active }) {
      try {
        const data = await database.update('users', userId, {name, mail, username, password, second_mail, admin, active });
        return data;
      } catch (e) {
        throw e;
      }
    }

    static async modifyPassword(userId, password) {
      try {
        const data = await database.update('users', userId, {password});
        return data;
      } catch (e) {
        throw e;
      }
    }

    /**
     * Adds new friend
     * @param   Integer   userId   [ID of user who request]
     * @param   Integer   friendId [ID of new friend]
     * @return Promise          [return results if a friend exists]
     */
    static async addFriend(userId, friendId) {
      try {
        const friends = await database.checkFriendship(userId, friendId);
        if (friends.length === 0 && !(userId === friendId)) {
          const data = await database.insertFriend(userId, friendId);
          return data;
        } else {
          const data = [];
          return data;
        }
      } catch (e) {
        throw e;
      }
    }

    /**
     * Changes friendship status
     * @param   Integer   userId   [ID of user]
     * @param   Integer   friendId [ID of friend]
     * @return Promise          [return modified data]
     */
    static async modifyFriendship(userId, friendId) {
      try {
        const data = await database.changeStatus(userId, friendId);
        const friendsId = await database.getFriendsId(userId);
        return data;
      } catch (e) {
        throw e;
      }
    }

    /**
     * Gets every friend of friend of user
     * @param   InIntegert   userId [ID of user who has friends]
     * @return Promise        [users in JSON]
     */
    static async selectAllFriends(userId) {
      try {
        const friendsId = await database.getFriendsId(userId);
        var users = [];
        var response = [];

        for (const id of friendsId) {
          users.push( await database.singleSelect('users', Object.values(id)))
        }

        users.forEach((u) => {
          response.push(new User(u));
        });

        return response;
      } catch (e) {
        throw e;
      }
    }

    static async getQuestionsBy(userId) {
      try {
        const data = await database.getQuestionsBy(userId);
        return data;
      } catch (e) {
        throw e;
      }
    }

    static async getBy(mail) {
      try {
        const data = await database.singleSelectWith(mail);
        return data.length !== 0 ? new User(data) : false;
      } catch (e) {
        throw e;
      }
    }

    static async getFriendshipRequest(userId) {
      try {
        const data = await database.selectAllFriends(userId);
        const response = [];
        data.forEach((r) => {
          response.push(new User(r));
        });
        return response;
      } catch (e) {
        throw e;
      }
    }

}

module.exports = User;
