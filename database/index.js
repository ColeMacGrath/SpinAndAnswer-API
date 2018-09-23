const mysql = require('mysql');

class DB {
  constructor() {
    this.con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    this.con.connect();
  }

  queryGet(table) {
    return this.con.query(`SELECT * FROM ${table}`, (err, rows) => {
      if (err) throw err;
      return this.processResults(rows);
    });
  }

  processResults(result){
    return result;
  }
}

exports.db = new DB();
