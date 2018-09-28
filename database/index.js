const mysql = require('mysql');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'testing',
            socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'

        });

        this.connection.connect((error) => {
          if(error) {
            console.error('Imposible to connect', error.stack);
            throw error;
          }
        });
    }

    selectAll(table) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM ??', [table], (error, results) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }

  singleSelect(table, id) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM ?? WHERE id = ?', [table, id], (error, results) => {
        if (error) return reject(error);
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
