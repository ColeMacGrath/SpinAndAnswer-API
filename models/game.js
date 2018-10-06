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

    static async getRandomQuestion(table) {
      var data = await database.getMax(table);
      const maxValue = Object.values(data[0]);
      var random = Math.floor(Math.random() * maxValue) + 1;
      const category = await database.getQuestionsOf(random);
      const maxQuestions = category.length;
      random = Math.floor(Math.random() * maxQuestions);
      var question = Object.values(category[random]);
      console.log('Question: ' + question);
      return question;
    }

    static async getAnswer(questionId, answer) {
      var correct = false;
      const question = await database.singleSelect('questions', questionId);
      const correctAnswer = question[0].correct_answer;
      if (answer == correctAnswer) {
        correct = true;
      }
      return correct;
    }
}

module.exports = Game;
