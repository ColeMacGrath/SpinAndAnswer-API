const express = require('express');
const mysql = require('mysql');

const app = express();

const router = require('./Route');

app.use(router);

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "prueba"
});

con.connect(function(err) {
  if (err) throw err;
});

con.query("SELECT * FROM usuarios", function (err, result, fields) {
  if (err) throw err;
  console.log(result)
});

app.listen(3000, () => console.log('running'));
