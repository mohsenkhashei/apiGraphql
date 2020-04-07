const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(config.db.mongo.connection + config.db.mongo.database, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {
    console.log('MongoDB Connected')
});
module.exports = mongoose;