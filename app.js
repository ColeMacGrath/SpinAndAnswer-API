const express = require('express');
require('dotenv').config();

const app = express();

const router = require('./routes');

// app.use(router);

app.send('hola');

// app.listen(process.env.DB_PORT, () => console.log('running'));
