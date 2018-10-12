const mysql = require('mysql');

class Database {
  /**
   * Creates a new connection with some parameters
   */
    constructor() {
      this.connection = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          socketPath: process.env.SOCKET_PATH,
      });

        this.connection.connect((error) => {
            if (error) {
                console.error('Imposible to connect', error.stack);
                throw error;
            }
        });
    }

    /**
     * Get every record of a table
     * @param  {[String]} table [new of a table to be queried]
     * @return {[resolve]}       [return every result]
     */
    selectAll(table) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM ?? WHERE active = 1', [table], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    /**
     * Gets a single recor of a table
     * @param  {[String]} table [name of table to be queried]
     * @param  {[Int]} id    [ID of element in table]
     * @return {[Resolve]}       [return every element that meets the criteria]
     */
    singleSelect(table, id) {
        let tableRow = table.substring(0, table.length - 1);
        tableRow = tableRow.concat('_id');
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM ?? WHERE ${tableRow} = ?`, [table, id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    /**
     * Changes active status
     * @param  {[Stirng]} table [table of element to be updated]
     * @param  {[Int]} id    [ID of element to be updated]
     * @return {[Resolve]}       [Return results of query]
     */
    changeActive(table, id) {
        let tableRow = table.substring(0, table.length - 1);
        tableRow = tableRow.concat('_id');
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE ?? SET active = CASE WHEN active = 0 THEN 1 ELSE 0 END WHERE ${tableRow} = ?`, [table, id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    /**
     * Inserts a element into the database
     * @param  {[String]} table    [Name of table to be updated]
     * @param  {[Array]} resource [elements to be added]
     * @return {[Resolve]}          [return results of query]
     */
    insert(table, resource) {
        return new Promise((resolve, reject) => {
          this.connection.query('INSERT INTO ?? SET ?', [table, resource], (error, results) => {
            if (error) return reject(error);
            return resolve(results);
          });
        });
    }


    /**
     * Updates elements into a table
     * @param  {[String]} table    [name of table to be updated]
     * @param  {[Int]} id       [ID of element to be modfied]
     * @param  {[Resolve]} resource [Data of element]
]
     */
    update(table, id, resource) {
        let tableRow = table.substring(0, table.length - 1);
        tableRow = tableRow.concat('_id');
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE ?? SET ? WHERE ${tableRow} = ${id}`, [table, resource], (error, results) => resolve(results));
        });
    }

    /**
     * Changes category of a question
     * @param  {[String]} table    [table to be updated]
     * @param  {[Int]} id       [ID of question to be modified]
     * @param  {[String]} category [New question's category]
     * @return {[Resolve]}          [Return results of query]
     */
    changeCategory(table, id, category) {
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE ?? SET category = ? WHERE question_id = ${id}`, [table, category], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    /**
     * Changes status of friends
     * @param  {[Int]} userId   [ID of user]
     * @param  {[Int]} friendId [ID of friend]
     * @return {[Resolve]}          [Return results of query]
     */
    changeStatus(userId, friendId) {
        return new Promise((resolve, reject) => {
            this.connection.query(`CALL changeFriendship(${userId}, ${friendId})`, (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    /**
     * Get frindId where User match with cirteria
     * @param  {[Int]} userId [ID of user of has a friend]
     * @return {[Resolve]}        [return results of query]
     */
    getFriendsId(userId) {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT friend_id FROM friends WHERE friend_user_id = ${userId}`, (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    /**
     * Create a new friendship
     * @param  {[Int]} userId   [ID of user]
     * @param  {[Int]} friendId [ID of new user's friend]
     * @return {[Resolve]}          [return results of query]
     */
    insertFriend(userId, friendId) {
        return new Promise((resolve, reject) => {
            this.connection.query(`CALL insertFriends(${userId}, ${friendId})`, (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    /**
     * Checks if existis a friendship between a user and other user
     * @param  {[Int]} userId   [ID of user]
     * @param  {[Int]} friendId [ID of possible friend]
     * @return {[Resolve]}          [return results of query (if empty users are not friends)]
     */
    checkFriendship(userId, friendId) {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM friends WHERE friend_user_id = ${userId} and friend_id =${friendId}`, (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    /**
     * Gets every single question in database
     * @return {[Resolve]} [return every question founded]
     */
    selectAllQuestions() {
        return new Promise((resolve, reject) => {
          this.connection.query('SELECT * FROM questions', (error, results) => {
            if (error) return reject(error);
            return resolve(results);
          });
        });
    }

    /**
     * Gests quetions from to (In a range)
     * @param  {[Int]} from [beginning of range]
     * @param  {[Int]} to   [End of range]
     * @return {[Resolve]}      [return every result that meets the criteria]
     */
    getQuestions(from, to) {
        return new Promise((resolve, reject) => {
          this.connection.query(`SELECT * from questions LIMIT ${from}, ${to}`, (error, results) => {
            if (error) return reject(error)
            return resolve(results);
          });
        });
    }

    /**
     * Gets questions of same category
     * @param  {[Int]} categoryId [ID of category]
     * @return {[Resolve]}            [Return every result that meets the criteria]
     */
    getQuestionsOf(categoryId) {
      return new Promise((resolve, reject) => {
        this.connection.query(`SELECT * FROM questions WHERE category = ${categoryId} AND active = 1`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    /**
     * Get quantity of data in a colum
     * @param  {[String]} column [name of column]
     * @param  {[String]} table  [name of table]
     * @return {[Resolve]}        [Return every result that meets the criteria]
     */
    getMax(column, table) {
      return new Promise((resolve, reject) => {
        this.connection.query(`SELECT MAX(${column}) FROM ${table}`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    /**
     * [Creates a game with some parameters]
     * @param  {[Int]} userId   [ID of user]
     * @param  {[Int]} rivalId  [ID of rival]
     * @param  {[String]} category [Topic of game]
     * @return {[Resolve]}          [return a created Game]
     */
    createGame(userId, rivalId, category) {
      return new Promise((resolve, reject) => {
        this.connection.query(`CALL createGame(${userId}, ${rivalId}, ${category})`, (error, results) => {
          if (error) return reject(error)
          return resolve(this.getMax('game_id', 'game'));
        });
      });
    }

    /**
     * Gets category of game
     * @param  {[Int]} gameId [ID of game to be queried]
     * @return {[Resolve]}        [return category of game]
     */
    getCategory(gameId) {
      return new Promise((resolve, reject) => {
        this.connection.query(`SELECT category FROM game WHERE game_id = ${gameId}`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    /**
     * get actual turn of game
     * @param  {[Int]} gameId [ID of game]
     * @return {[Resolve]}        [return actual turn if game existis]
     */
    getTurn(gameId) {
      return new Promise((resolve, reject) => {
        this.connection.query(`SELECT turn FROM game WHERE game_id = ${gameId}`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    /**
     * Add one in a turn
     * @param  {[Int]} gameId [ID of game]
     * @return {[Resolve]}        [return a results upadated]
     */
    sumTurn(gameId) {
      return new Promise((resolve, reject) => {
        this.connection.query(`UPDATE game SET turn = turn + 1 WHERE game_id = ${gameId}`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    /**
     * Adds points for a user
     * @param  {[Int]} gameId  [ID of game]
     * @param  {[Int]} user_id [ID of user who won points]
     * @param  {[Int]} points  [Quantity of points to be added]
     * @return {[Resolve]}         [Return data updated]
     */
    updatePoints(gameId, user_id, points) {
      return new Promise((resolve, reject) => {
        this.connection.query(`CALL updatePoints(${gameId}, ${user_id}, ${points})`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    /**
     * Gets ID
     * @param  {[Int]} colum  [description]
     * @param  {[Int]} gameId [description]
     * @return {[Resolve]}        [description]
     */
    getIdOf(colum, gameId) {
      return new Promise((resolve, reject) => {
        this.connection.query(`SELECT ${colum} FROM game WHERE game_id = ${gameId}`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    /**
     * Show results of a specific game
     * @param  {[Int]} gameId [ID of game]
     * @return {[Resolve]}        [Return results of a game]
     */
    getGameResults(gameId) {
      return new Promise((resolve, reject) => {
        this.connection.query(`SELECT * FROM game WHERE game_id = ${gameId}`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    /**
     * Gets every data of a specific table in database
     * @param  {[String]} table [name of table]
     * @return {[Resolve]}       [return results]
     */
    selectAllGames(table) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM ??', [table], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    /**
     * disconnects of database
     * @return {[connection]} [description]
     */
    disconnect() {
        this.connection.end();
    }

    /**
     * Destroy connection of database
     * @return {[connection]} [description]
     */
    destroy() {
        this.connection.destroy();
    }
}

module.exports = new Database();
