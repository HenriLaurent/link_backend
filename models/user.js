const { Sequelize } = require('sequelize');
const db = require('../config/database');
const Interest = require('./interest');
const Event =require('./event');



const User = db.define('User', {
  google_id:Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  email: Sequelize.STRING,
  city: Sequelize.STRING,
  phone: Sequelize.STRING,
  gender: Sequelize.STRING,
  age: Sequelize.INTEGER,
  nbr_friend: Sequelize.INTEGER,
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT
}, {
  db,
  modelName: 'User',
  tableName: "user",
  timestamps: false,
});

User.belongsToMany(Interest, {
  through: "user_has_interest",
  foreignKey: "interest_id",
  otherKey: 'user_id',
  timestamps: false,
  as: "interest"
});

Interest.belongsToMany(User, {
  through: "user_has_interest",
   foreignKey: "user_id",
   otherKey: "interest_id",
   timestamps: false,
   as: "user" 
 });

 User.belongsToMany(Event, {
  through: "event_has_user",
   foreignKey: "event_id",
   otherKey: "user_id",
   timestamps: false,
   as: "event" 
 });

 Event.belongsToMany(User, {
  through: "event_has_user",
   foreignKey: "user_id",
   otherKey: "event_id",
   timestamps: false,
   as: "user" 
 });

 User.belongsToMany(User, {
  through: "user_is_friend_with",
  foreignKey: "user_id",
  otherKey: "friend_id",
  timestamps: false,
  as: "user" 
 });

 User.belongsToMany(User, {
  through: "user_is_friend_with",
  foreignKey: "friend_id",
  otherKey: "user_id",
  timestamps: false,
  as: "friend" 
 });


/*  User.belongsToMany(User, {
  through: "user_has_liked",
  foreignKey: "user_id",
  otherKey: "user_liked_id",
  timestamps: false,
  as: "user_liking" 
 });

 User.belongsToMany(User, {
  through: "user_has_liked",
  foreignKey: "user_liked_id",
  otherKey: "user_id",
  timestamps: false,
  as: "user_liked" 
 });

 User.belongsToMany(User, {
  through: "user_has_disliked",
  foreignKey: "user_id",
  otherKey: "user_disliked_id",
  timestamps: false,
  as: "user_disliking" 
 });

 User.belongsToMany(User, {
  through: "user_has_disliked",
  foreignKey: "user_disliked_id",
  otherKey: "user_id",
  timestamps: false,
  as: "user_disliked" 
 });


  */





module.exports = User;
