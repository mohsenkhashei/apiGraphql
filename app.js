const express = require('express');
const env = require('dotenv').config({path: './config/.env'});
const config = require('./config/config');

const app = express();
const api = require('./routes/api');
app.use('/api', api);

app.listen(config.app.port, ()=> console.log(`Server start on port`, config.app.port));