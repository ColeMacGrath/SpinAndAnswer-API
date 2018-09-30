const database = require('../database');

class User {
    constructor(id, name, mail, username, password, admin) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.admin = admin;
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
        return data.lenght !== 0 ? new User(data[0]) : data;
    }

    static async changeActive(userId) {
        const data = await database.changeActive('users', userId);
        return data;
    }
}

module.exports = User;
