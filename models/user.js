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

    static async getAll() {
        const data = await database.selectAll('users');
        const response = [];
        data.forEach((r) => {
            response.push(new User(r));
        });
        return response;
    }

    static async get(userId) {
        const data = await database.singleSelect('users', userId);
        return data;
    }

    static async getFriend(friendId) {
      const data = await database.singleSelect('users', friendId);
      return data;
    }

    static async changeActive(userId) {
        const data = await database.changeActive('users', userId);
        return data;
    }

    static async create({name, mail, username, password}){
      let response = await database.insert('users', {name, mail, username, password});

      const id = response.insertId;
      if (id > 0){
        return new User({id, name, mail, username, password});
      }
      return [];
    }

    static async modify(userId, { name, mail, username, password, admin, active }) {
        const data = await database.update('users', userId, {name, mail, username, password, admin, active });
        return data;
    }
}

module.exports = User;
