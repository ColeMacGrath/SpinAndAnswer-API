require('dotenv').config();
const express = require('express');

const app = express();

const router = require('./routes');

app.use(router);

app.listen(process.env.DB_LOCAL_PORT, () => console.log('running'));
