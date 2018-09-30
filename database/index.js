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
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM ?? WHERE user_id = ?', [table, id], (error, results) => {
                if (error) return reject(error);
                return resolve(results);
            });
        });
    }

    changeActive(table, id) {
        // let tableRow = table.substring(0, table.length - 1);
        // tableRow = tableRow.concat('_id');
        return new Promise((resolve, reject) => {
            this.connection.query('UPDATE ?? SET active = CASE WHEN active = 0 THEN 1 ELSE 0 END WHERE user_id = ?', [table, id], (error, results) => {
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

    disconnect() {
        this.connection.end();
    }

    destroy() {
        this.connection.destroy();
    }
}

module.exports = new Database();
