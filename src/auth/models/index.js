'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users');

const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite::memory' 
  : process.env.DATABASE_URL;

const sequelizeDatabase = new Sequelize(DATABASE_URL);

const userModel = userSchema(sequelizeDatabase, DataTypes);

// exports as object need to import as object
module.exports = {
  sequelizeDatabase,
  userModel,
};
