const path = require('path');
// this will load .env parameters to process.env
const env = require('dotenv').config({path: path.join(__dirname, '.env')});
const Sequelize = require('sequelize');
const client = new Sequelize(process.env.PG_URL);
module.exports = client;