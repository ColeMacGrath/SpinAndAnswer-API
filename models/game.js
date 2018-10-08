const database = require('../database');

class Game {
    constructor(game_id, game_user_id, rival_id, user_score, rival_score, game_date, turn, category) {
        this.game_id = game_id;
        this.game_user_id = game_user_id;
        this.rival_id = rival_id;
        this.user_score = user_score;
        this.rival_score = rival_score;
        this.game_date = game_date;
        this.turn = turn;
        this.category = category;
    }

    static async getAllGames() {
        const data = await database.selectAll('game');
        const response = [];
        data.forEach((r) => {
            response.push(new Game(r));
        });
        return response;
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

    static async createGame(userId, rivalID, category) {
      const game = await database.createGame(userId, rivalID, category);
      return game;
    }

    static async getMax(column, table) {
      const max = await database.getMax(column, table);
      return max;
    }

    static async getRandomQuestion(table) {
      //El mayor de los valores de las categorías
      var max = await database.getMax('category', table);
      //Se obtiene el número a partir del objeto entregado en el paso anterior
      const maxValue = Object.values(max[0]);
      //Se obtiene un random desde 1 hasta el máximo valor obtenido (categoría)
      var random = Math.floor(Math.random() * maxValue) + 1;
      //Se obtienen las preguntas de la categoría en base al random obtenido anteriormente
      const questions = await database.getQuestionsOf(random);
      //Se obtiene el total de las preguntas de esa categoría
      const maxQuestions = questions.length;
      //Se obtiene un random de 1 a la última pregunta disponible
      random = Math.floor(Math.random() * maxQuestions);
      //Se obtiene una pregunta random
      var question = Object.values(questions[random]);
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

    static async getCategory(gameId) {
      var category = await database.getCategory(gameId);
      category = Object.values(category[0]);
      return category[0];
    }

    static async getTurn(gameId) {
      var turn = await database.getTurn(gameId);
      turn = Object.values(turn[0]);
      return turn[0];
    }

    static async sumTurn(gameId) {
      var turn = await database.sumTurn(gameId);
    }

    static async getIdOf(colum, gameId) {
      var id = await database.getIdOf(colum, gameId);
      id = Object.values(id[0]);
      return id[0];
    }

    static async updatePoints(gameId, userId, points) {
      let p = await database.updatePoints(gameId, userId, points);
      return p;
    }

    static async get(gameId) {
      let game = await database.getGameResults(gameId);
      return game;
    }

    static async exists(userId, rivalId) {
      var exists = false;
      const user = await database.singleSelect('users', userId);
      const rival = await database.singleSelect('users', rivalId);
      if (user.length && rival.length) {
        if (user[0].active && rival[0].active) {
          exists = true;
        }
      } else {
        console.log('ELSE');
      }
      return exists;
    }
}

module.exports = Game;
