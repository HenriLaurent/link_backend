const { Sequelize } = require('sequelize');
const db = require('../config/database');



const Event = db.define('Event', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  location: Sequelize.STRING,
  picture: Sequelize.STRING,
  date: Sequelize.STRING,
  creator:Sequelize.INTEGER,

}, {
  db,
  modelName: 'Event',
  tableName: "event",
  timestamps: true,
});


module.exports = Event;