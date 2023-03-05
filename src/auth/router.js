'use strict';

const express = require('express');
const { userModel } = require('./models');
const basicAuth = require('./middleware/basic');

// Step #1 Router - bring in the router
const router = express.Router();

// Step #2 Router - use the router
// Thunder Client use post, body
router.post('/signup', async (req, res, next) => {
  try {
    console.log(req.body)
    //using userModel and use create method sent req.body(has the user name and raw password).
    // the model.beforeCreate will catch req.body(has the user name and raw password) before create a user into the database
    let newUser = await userModel.create(req.body);
    res.status(200).send(newUser);
  } catch (e){
    next('signup error occurred');
  }
});

// Step #2 Router - use the router
// Thunder Client use post, auth -> basic
router.post('/signin', basicAuth, (req, res, next) => {
  res.status(200).send(req.user);
});

module.exports = router;
