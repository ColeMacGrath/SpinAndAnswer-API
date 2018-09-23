const express = require('express');
//const mysql = require('mysql');

const app = express();

const router = require('./routes');

app.use(router);

/*var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

con.connect(function(err) {
  if (err) throw err;
});

con.query("SELECT * FROM user", function (err, result, fields) {
  if (err) throw err;
  console.log(result)
});*/
app.listen(3000, () => console.log('running'));
