const express = require('express');
const env = require('dotenv').config({path: './config/.env'});
const config = require('./config/config');

const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')

const mongo = require('./database/mongo');
// const mysql = require('./database/mysql');




const app = express();
const api = require('./routes/api');
app.use('/api', api);
const db = require('./routes/db');
app.use('/db', db);




app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));









app.listen(config.app.port, ()=> console.log(`Server start on port`, config.app.port));