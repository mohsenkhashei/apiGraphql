const config = require('../config/config');
const mysql = require('mysql');


var Sequelize = require('sequelize'),
   sequelize = new Sequelize(config.db.mysql.database, config.db.mysql.user, config.db.mysql.password, {
      dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
      port:    3306, // or 5432 (for postgres)
    });

sequelize.authenticate()
  .then(function(err) {
    console.log('MYSql Connected');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });
  
module.exports = sequelize;