const express = require('express');
require('dotenv').config();

const app = express();

const router = require('./routes');

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.use(router);

app.listen(3000, () => console.log('running'));
