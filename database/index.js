const mysql = require('mysql');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'spinandanswer',
            socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
        });

        this.connection.connect((error) => {
            if (error) {
                console.error('Imposible to connect', error.stack);
                throw error;
            }
        });
    }

    selectAll(table) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM ?? WHERE active = 1', [table], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

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

    insert(table, resource) {
      console.log(resource);
        return new Promise((resolve, reject) => {
          this.connection.query('INSERT INTO ?? SET ?', [table, resource], (error, results) => {
            if (error) return reject(error);
            return resolve(results);
          });
        });
    }

    update(table, id, resource) {
        let tableRow = table.substring(0, table.length - 1);
        tableRow = tableRow.concat('_id');
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE ?? SET ? WHERE ${tableRow} = ${id}`, [table, resource], (error, results) => resolve(results));
        });
    }

    changeCategory(table, id, category) {
        return new Promise((resolve, reject) => {
            this.connection.query(`UPDATE ?? SET category = ? WHERE question_id = ${id}`, [table, category], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    changeStatus(userId, friendId) {
        return new Promise((resolve, reject) => {
            this.connection.query(`CALL changeFriendship(${userId}, ${friendId})`, (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    getFriendsId(userId) {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT friend_id FROM friends WHERE friend_user_id = ${userId}`, (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    insertFriend(userId, friendId) {
        return new Promise((resolve, reject) => {
            this.connection.query(`CALL insertFriends(${userId}, ${friendId})`, (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    checkFriendship(userId, friendId) {
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM friends WHERE friend_user_id = ${userId} and friend_id =${friendId}`, (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    selectAllQuestions() {
        return new Promise((resolve, reject) => {
          this.connection.query('SELECT * FROM questions', (error, results) => {
            if (error) return reject(error);
            return resolve(results);
          });
        });
    }

    getQuestions(from, to) {
        return new Promise((resolve, reject) => {
          this.connection.query(`SELECT * from questions LIMIT ${from}, ${to}`, (error, results) => {
            if (error) return reject(error)
            return resolve(results);
          });
        });
    }

    getQuestionsOf(categoryId) {
      return new Promise((resolve, reject) => {
        this.connection.query(`SELECT * FROM questions WHERE category = ${categoryId} AND active = 1`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    getMax(column, table) {
      return new Promise((resolve, reject) => {
        this.connection.query(`SELECT MAX(${column}) FROM ${table}`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    createGame(userId, rivalId, category) {
      return new Promise((resolve, reject) => {
        this.connection.query(`CALL createGame(${userId}, ${rivalId}, ${category})`, (error, results) => {
          if (error) return reject(error)
          return resolve(this.getMax('game_id', 'game'));
        });
      });
    }

    getCategory(gameId) {
      return new Promise((resolve, reject) => {
        this.connection.query(`SELECT category FROM game WHERE game_id = ${gameId}`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    getTurn(gameId) {
      return new Promise((resolve, reject) => {
        this.connection.query(`SELECT turn FROM game WHERE game_id = ${gameId}`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    sumTurn(gameId) {
      return new Promise((resolve, reject) => {
        this.connection.query(`UPDATE game SET turn = turn + 1 WHERE game_id = ${gameId}`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    updatePoints(gameId, user_id, points) {
      return new Promise((resolve, reject) => {
        this.connection.query(`CALL updatePoints(${gameId}, ${user_id}, ${points})`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    getIdOf(colum, gameId) {
      return new Promise((resolve, reject) => {
        this.connection.query(`SELECT ${colum} FROM game WHERE game_id = ${gameId}`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    getGameResults(gameId) {
      return new Promise((resolve, reject) => {
        this.connection.query(`SELECT * FROM game WHERE game_id = ${gameId}`, (error, results) => {
          if (error) return reject(error)
          return resolve(results);
        });
      });
    }

    disconnect() {
        this.connection.end();
    }

    destroy() {
        this.connection.destroy();
    }
}

module.exports = new Database();
