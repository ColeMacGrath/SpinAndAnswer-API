require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const router = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);


app.listen(process.env.DB_LOCAL_PORT, () => console.log('running'));
