const express = require('express');
require('dotenv').config();

const app = express();

const router = require('./routes');

app.use(router);

app.listen(process.env.PORT, () => console.log('running'));
