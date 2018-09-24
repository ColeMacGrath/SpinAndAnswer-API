const database = require('../database');

class User {
    constructor(id, name, mail, username, password, admin) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.admin = admin;
    }

    getName() {
        return this.name;
    }

    getMail() {
        return this.mail;
    }

    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }

    getAdminStatus() {
        return this.admin;
    }

    save() {
        database.create(this);
    }

    getAll() {
        database.getAll(this);
    }

    delete(id) {
        database.delete(this, id);
    }

    modify(name, username, mail, password, id) {
        database.modifyUser(this, name, username, mail, password, id);
    }
}
