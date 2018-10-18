const database = require('../database');

class User {
    constructor(id, name, mail, username, password, admin, active) {
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.username = username;
        this.password = password;
        this.admin = admin;
        this.active = active;
    }

    /**
     * Gets every user
     * @return {Promise} [return users in JSON of database]
     */
    static async getAll() {
        const data = await database.selectAll('users');
        const response = [];
        data.forEach((r) => {
            response.push(new User(r));
        });
        return response;
    }

    /**
     * Get a single user
     * @param  {Int}  userId [ID of user to get]
     * @return {Promise}        [Return user in JSON data]
     */
    static async get(userId) {
        const data = await database.singleSelect('users', userId);
        return data;
    }

    static async getByUserAndPass(usern, pass) {
        const data = await database.selectByUserAndPass(usern, pass);
        return data;
    }

    /**
     * Change status of user
     * @param  {Int}  userId [ID of user to be changed]
     * @return {Promise}        [return modified data in JSON]
     */
    static async changeActive(userId) {
        const data = await database.changeActive('users', userId);
        return data;
    }

    /**
     * Creates a new user
     * @param  {String}  name     [name of new user]
     * @param  {String}  mail     [mail of new user]
     * @param  {String}  username [username of new user]
     * @param  {String}  password [password of new user]
     * @return {Promise}          [return a new user]
     */
    static async create({name, mail, username, password}){
      let response = await database.insert('users', {name, mail, username, password});

      const id = response.insertId;
      if (id > 0){
        return new User({id, name, mail, username, password});
      }
      return [];
    }

    /**
     * Modifies an existent user
     * @param  {Int}  userId   [Int]
     * @param  {String}  name     [String]
     * @param  {String}  mail     [String]
     * @param  {String}  username [String]
     * @param  {String}  password [String]
     * @param  {Int}  admin    [Int]
     * @param  {Int}  active   [Int]
     * @return {Promise}          [Return modified data]
     */
    static async modify(userId, { name, mail, username, password, admin, active }) {
        const data = await database.update('users', userId, {name, mail, username, password, admin, active });
        return data;
    }

    /**
     * Adds new friend
     * @param  {Int}  userId   [ID of user who request]
     * @param  {Int}  friendId [ID of new friend]
     * @return {Promise}          [return results if a friend exists]
     */
    static async addFriend(userId, friendId) {
      const friends = await database.checkFriendship(userId, friendId);
      if (friends.length === 0 && !(userId === friendId)) {
          const data = await database.insertFriend(userId, friendId);
          return data;
        } else {
          const data = [];
          return data;
        }
    }

    /**
     * Changes friendship status
     * @param  {Int}  userId   [ID of user]
     * @param  {Int}  friendId [ID of friend]
     * @return {Promise}          [return modified data]
     */
    static async modifyFriendship(userId, friendId) {
        const data = await database.changeStatus(userId, friendId);
        const friendsId = await database.getFriendsId(userId);
        return data;
    }

    /**
     * Gets every friend of friend of user
     * @param  {Int}  userId [ID of user who has friends]
     * @return {Promise}        [users in JSON]
     */
    static async selectAllFriends(userId) {
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
    }
}

module.exports = User;
