const mysql = require('mysql');

class Database {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'testing',
            socketPath: process.env.SOCKET_PATH,
        });

        this.connection.connect();
    }

    getAll(table) {
        this.connection.query(`SELECT * FROM ${table}`, (err, result) => {
            if (err) throw err;
            this.result = result;
            return result;
        });
    }

    query() {
        this.connection.query('SELECT * FROM users', (err, result) => {
            if (err) throw err;
            console.log(result);
        });
    }
}

module.exports = new Database();
