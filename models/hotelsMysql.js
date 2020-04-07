const Sequelize = require('sequelize');
const connection = require('../database/mysql');

var Hotels = connection.define('tws_hotelspro_hotels', {
    name: Sequelize.STRING,
    star: Sequelize.STRING,
    country_code: Sequelize.STRING,
    country_name: Sequelize.STRING,
    code: Sequelize.STRING,
    destination : Sequelize.STRING ,
    destination_latitude : Sequelize.STRING ,
    destination_longitude : Sequelize.STRING ,
    region : Sequelize.STRING ,
    address : Sequelize.STRING ,
    latitude : Sequelize.STRING ,
    longitude : Sequelize.STRING ,
    nr_rooms : Sequelize.INTEGER,
    themes : Sequelize.TEXT ,
    facilities : Sequelize.TEXT 
  });

module.exports = Hotels;

