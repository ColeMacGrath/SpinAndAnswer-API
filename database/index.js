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

        this.connection.connect();
    }

    getAll(table) {
        // escapado: var sql = 'SELECT * FROM users WHERE id = ' + connection.escape(userId)
        // query: connection.query('SELECT * FROM users WHERE id = ?'
        // + [userId], function (error, results, fields))
        this.connection.query(`SELECT * FROM ${table}`, (err, result) => {
            // this.result = this.processResult(table, result);
            if (err) throw err; // Not necesary
            this.result = result; // Not necesary
            return result;
        });
        // return this.result;
    }

    query() {
        this.connection.query('SELECT * FROM users', (err, result /* , fields */) => {
            if (err) throw err;
            console.log(result);
        });
    }

    /* processResult(table, result) {
        this.result.forEach((result) => {
            new [table](result);
        });
    } */
}

module.exports = new Database();
