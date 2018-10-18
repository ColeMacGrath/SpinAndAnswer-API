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

    /**
     * Connects with database to get a JSON with all games
     * @return {Promise} [return formated data]
     */
    static async getAllGames() {
        const data = await database.selectAllGames('game');
        const response = [];
        data.forEach((r) => {
            response.push(new Game(r));
        });
        return data;
    }

    /**
     * Get every question in database
     * @return {Promise} [return in a JSON format all the questions]
     */
    static async getAll() {
        const data = await database.selectAllQuestions();
        return data;
    }

    /**
     * Get all questions form n to n
     * @param  {Int}  from [where does the questions start to be listed]
     * @param  {Int}  to   [where does the questions finishes to be listed]
     * @return {Promise}      [return all questions in rage from to]
     */
    static async getQuestions(from, to) {
      const data = await database.getQuestions(from, to);
      return data;
    }

    /**
     * Get every questions with same category
     * @param  {Int}  categoryId [category in number format]
     * @return {Promise}            [return a JSON of questions with same category]
     */
    static async getQuestionsOf(categoryId) {
      const data = await database.getQuestionsOf(categoryId);
      return data;
    }

    /**
     * Create a new game in database
     * @param  {Int}  userId   [user who wants to start a game]
     * @param  {Int}  rivalID  [a rival of original user who is supposed to play]
     * @param  {Int}  category [number of category of game (topic)]
     * @return {Promise}          [return all new game information]
     */
    static async createGame(userId, rivalID, category) {
      const game = await database.createGame(userId, rivalID, category);
      return game;
    }

    /**
     * Get max quantity of things in a table
     * @param  {String}  column [Colum of the table to search]
     * @param  {String}  table  [table wich contains information to count]
     * @return {Promise}        [description]
     */
    static async getMax(column, table) {
      const max = await database.getMax(column, table);
      return max;
    }

    /**
     * Get a random question of a category
     * @param  {String}  table [category to search and get a randm question]
     * @return {Promise}       [return a random question]
     */
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

    /**
     * Get an answer for a qeustion
     * @param  {Int}  questionId [ID of question]
     * @param  {String}  answer     [Answer to be checked]
     * @return {Promise}            [return a result]
     */
    static async getAnswer(questionId, answer) {
      var correct = false;
      const question = await database.singleSelect('questions', questionId);
      const correctAnswer = question[0].correct_answer;
      if (answer == correctAnswer) {
        correct = true;
      }
      return correct;
    }

    /**
     * Get a category of a specific game
     * @param  {Int}  gameId [ID of game to get the category]
     * @return {Promise}        [return the category of the game]
     */
    static async getCategory(gameId) {
      var category = await database.getCategory(gameId);
      category = Object.values(category[0]);
      return category[0];
    }

    /**
     * Gets the specific turn of game, it means who's next to answer
     * @param  {Int}  gameId [ID of game to determine turn]
     * @return {Promise}        [return a turn in number]
     */
    static async getTurn(gameId) {
      var turn = await database.getTurn(gameId);
      turn = Object.values(turn[0]);
      return turn[0];
    }

    /**
     * Adds a single turn in a turn column
     * @param  {Int}  gameId [ID of game for add a turn]
     * @return {Promise}        [return a modified table info]
     */
    static async sumTurn(gameId) {
      var turn = await database.sumTurn(gameId);
    }

    /**
     * Gets ID of user
     * @param  {String}  colum  [colum to search]
     * @param  {Int}  gameId [gameId wich contains the table]
     * @return {Promise}        [description]
     */
    static async getIdOf(colum, gameId) {
      var id = await database.getIdOf(colum, gameId);
      id = Object.values(id[0]);
      return id[0];
    }

    /**
     * Updates points when a user answer correctly
     * @param  {Int}  gameId [ID of game in progress]
     * @param  {Int}  userId [ID of user who answer]
     * @param  {Int}  points [Quantity of points to sum]
     * @return {Promise}        [return a modified data]
     */
    static async updatePoints(gameId, userId, points) {
      let p = await database.updatePoints(gameId, userId, points);
      return p;
    }

    /**
     * Get a single specific game
     * @param  {Int}  gameId [ID of game to consult]
     * @return {Promise}        [return a game]
     */
    static async get(gameId) {
      let game = await database.getGameResults(gameId);
      return game;
    }

    /**
     * Verifies if user and rival exists
     * @param  {Int}  userId  [User who wants to play]
     * @param  {Int}  rivalId [Oponent of user]
     * @return {Promise}         [return true if both existis, false if one or both doesn't exist]
     */
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
