const mysql = require('mysql');

class Database {
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

    insert(table, resource){
        return new Promise((resolve, reject) => {
          this.connection.query('INSERT INTO ?? SET ?', [table, resource], (error, results) => {
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

    getMax(table) {
      return new Promise((resolve, reject) => {
        this.connection.query(`SELECT MAX(category) FROM ${table}`, (error, results) => {
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
