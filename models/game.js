const database = require('../database');

class Game {
    constructor(id, user, mail, username, password, admin, active) {
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.username = username;
        this.password = password;
        this.admin = admin;
        this.active = active;
    }

    static async getAll() {
        const data = await database.selectAllQuestions();
        return data;
    }

    static async getQuestions(from, to) {
      const data = await database.getQuestions(from, to);
      return data;
    }

    static async getQuestionsOf(categoryId) {
      const data = await database.getQuestionsOf(categoryId);
      return data;
    }
}

module.exports = Game;
