const Sequelize = require('sequelize');
module.exports = new Sequelize('bind', 'henri', 'bind', {
    host: 'localhost',
    dialect: 'postgres',
    logging:false
  });