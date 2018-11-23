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
     * @return Promise return formated data
     */
    static async getAllGames() {
        try {
          const data = await database.select('*', 'game' ,'');
          const response = [];
          data.forEach((r) => {
            response.push(new Game(r));
          });
          return data;
        } catch (e) {
          throw e;
        }
    }

    /**
     * Get all questions from n to n
     * @param   Integer   from  Where does the questions start to be listed
     * @param   Integer   to    Where does the questions finishes to be listed
     * @return  Promise         Return all questions in rage from to
     */
    static async getQuestions(from, to) {
      try {
        const data = await database.select('*', 'questions', `LIMIT ${from}, ${to}`);
        return data;
      } catch (e) {
        throw e;
      }
    }

    /**
     * Get every questions with same category
     * @param   Integer   categoryId category in number format
     * @return  Promise   return a JSON of questions with same category
     */
    static async getQuestionsOf(category) {
      try {
        const data = await database.select('*', 'questions', `WHERE category = ${category}`);
        return data;
      } catch (e) {
        throw e;
      }
    }

    /**
     * Create a new game in database
     * @param   Integer   userId    user who wants to start a game
     * @param   Integer   rivalID   Rival of original user who is supposed to play
     * @param   Integer   category  number of category of game (topic)
     * @return  Promise             return all new game information
     */
    static async createGame(userId, rivalId, category) {
      try {
        const game = await database.callProcedure(`createGame(${userId}, ${rivalId}, ${category})`);
      } catch (e) {
        throw e;
      }
    }

    /**
     * Get max quantity of things in a table
     * @param   String   column  Colum of the table to search
     * @param   String   table   table wich contains information to count
     * @return  Promise
     */
    static async getMax(column, table) {
      try {
        const max = await database.select(`MAX(${column})`, 'game');
        return max;
      } catch (e) {
        throw e;
      }
    }

    /**
     * Get a random question of a category
     * @param   String   table category to search and get a randm question
     * @return  Promise        return a random question
     */
    static async getRandomQuestion(table) {
      try {
        //El mayor de los valores de las categorías
        var max = await database.select(`MAX(category)`, `${table}`);
        //Se obtiene el número a partir del objeto entregado en el paso anterior
        const maxValue = Object.values(max[0]);
        //Se obtiene un random desde 1 hasta el máximo valor obtenido (categoría)
        var random = Math.floor(Math.random() * maxValue) + 1;
        //Se obtienen las preguntas de la categoría en base al random obtenido anteriormente
        const questions = await database.select('*', 'questions', `WHERE category = ${categoryId} AND active = 1`);
        //Se obtiene el total de las preguntas de esa categoría
        const maxQuestions = questions.length;
        //Se obtiene un random de 1 a la última pregunta disponible
        random = Math.floor(Math.random() * maxQuestions);
        //Se obtiene una pregunta random
        var question = Object.values(questions[random]);
        return question;
      } catch (e) {
        throw e;
      }
    }

    /**
     * Get an answer for a qeustion
     * @param   Integer   questionId ID of question
     * @param   String    answer     Answer to be checked
     * @return  Promise            return a result
     */
    static async getAnswer(questionId, answer) {
      try {
        var correct = false;
        const question = await database.select('*', 'questions', `WHERE question_id = ${questionId}`);
        const correctAnswer = question[0].correct_answer;
        if (answer == correctAnswer) {
          correct = true;
        }
        return correct;
      } catch (e) {
        throw e;
      }
    }

    /**
     * Get a category of a specific game
     * @param   Integer   gameId  ID of game to get the category
     * @return  Promise           return the category of the game
     */
    static async getCategory(gameId) {
      try {
        var category = await database.select('category', 'game', `WHERE game_id = ${gameId}`);
        category = Object.values(category[0]);
        return category[0];
      } catch (e) {
        throw e;
      }
    }

    /**
     * Gets the specific turn of game, it means who's next to answer
     * @param   Integer   gameId  ID of game to determine turn
     * @return  Promise           return a turn in number
     */
    static async getTurn(gameId, userId) {
      try {
        var turn = await database.select('turn', 'game', `WHERE game_id = ${gameId} AND game_user_id = ${userId}`);
        turn = Object.values(turn[0]);
        return turn[0];
      } catch (e) {
        throw e;
      }
    }

    /**
     * Adds a single turn in a turn column
     * @param   Integer   gameId  ID of game for add a turn
     * @return  Promise           return a modified table info
     */
    static async sumTurn(gameId, userId) {
      try {
        let turn = await database.update('game', `turn = turn + 1 WHERE game_id = ${gameId} AND game_user_id = ${userId}`);
      } catch (e) {
        throw e;
      }
    }

    /**
     * Gets ID of user
     * @param   String   colum  colum to search
     * @param   Integer  gameId gameId wich contains the table
     * @return  Promise
     */
    static async getIdOf(colum, gameId) {
      try {
        var id = await database.select(`${colum}`, 'game', `WHERE game_id = ${gameId}`);
        id = Object.values(id[0]);
        return id[0];
      } catch (e) {
        throw e;
      }
    }

    /**
     * Updates points when a user answer correctly
     * @param   Integer   gameId  ID of game in progress
     * @param   Integer   userId  ID of user who answer
     * @param   Integer   points  Quantity of points to sum
     * @return Promise            return a modified data
     */
    static async updatePoints(gameId, userId, points) {
      try {
        let response = await database.callProcedure(`updatePoints(${gameId}, ${userId}, ${points})`);
        return response;

      } catch (e) {
        throw e;
      }
    }

    /**
     * Get a single specific game
     * @param   Integer  gameId   ID of game to consult
     * @return  Promise           return a game
     */
    static async get(gameId) {
      try {
        let game = await database.select('*', 'game', `WHERE game_id = ${gameId}`);
        return game;
      } catch (e) {
        throw e;
      }
    }

    /**
     * Verifies if user and rival exists
     * @param   Integer   userId    User who wants to play
     * @param   Integer   rivalId   Oponent of user
     * @return  Promise             Return true if both existis, false if one or both doesn't exist
     */
    static async exists(userId, rivalId) {
      try {
        var exists = false;
        const user = await database.select('*', 'users', `WHERE user_id = ${userId}`);
        const rival = await database.select('*', 'users', `WHERE user_id = ${rivalId}`);
        if (user.length && rival.length) {
          if (user[0].active && rival[0].active) {
            exists = true;
          }
        }
        return exists;
      } catch (e) {
        throw e;
      }
    }

    static async isActive(gameId) {
      try {
        var active = false;
        const game = await this.get(gameId);
        const gameDate = new Date(game[0].game_date);
        gameDate.setDate(gameDate.getDate() + process.env.GAME_EXPIRES);
        const actualDate = new Date();
        if (gameDate > actualDate) {
          active = true;
        }
        return active;
      } catch (e) {
        throw e;
      }
    }

}

module.exports = Game;
