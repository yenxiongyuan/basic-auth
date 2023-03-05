'use strict';

const bcrypt = require('bcrypt');

// const userSchema = () => callback, pass in (sequelizeDatabase, DataTypes)
const userSchema = (sequelizeDatabase, DataTypes) => {
  // if you return sequelizeDatabase.define, then don't need model.beforeCreate
  const model = sequelizeDatabase.define('users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // use model.beforeCreate is to console.log before create userSchema, good for trouble shooting 
  //use the model in userSchema for model.beforeCreate
  model.beforeCreate(async (user) => {
    console.log(user);
    let hashedPassword = await bcrypt.hash(user.password, 5); //hash the user.password
    console.log('hashed password in before create', hashedPassword);
    user.password = hashedPassword;
  });

  return model; // you want to use the model, need to return it
};

module.exports = userSchema;
