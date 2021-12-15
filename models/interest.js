/* 'use strict';
const {Model} = require('sequelize');
 */

const { Sequelize } = require('sequelize');
const db = require('../config/database');



const Interest = db.define('Interest', {
  title: Sequelize.STRING,
}, {
  db,
  modelName: 'Interest',
  tableName: "interest",
  timestamps: false,
});


module.exports = Interest;


/* module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {


    static associate(models) {

     Interest.belongsToMany(models.User, {
       through: "user_has_interest",
        foreignKey: "user_id",
        otherKey: "interest_id",
        timestamps: false,
        as: "user" 
      });

    }

  };
  Interest.init({
    title: DataTypes.STRING,
  }, {
    sequelize,
    schema: 'app',
    modelName: 'Interest',
    tableName: "interest",
    timestamps: false,
  });
  return Interest;
}; */