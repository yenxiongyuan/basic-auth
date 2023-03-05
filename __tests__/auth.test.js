'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const sequelizeDatabase = require('../src/auth/models');
const { DESCRIBE } = require('sequelize/types/query-types');
const request = supertest(app);

beforeAll(async() => {
  await sequelizeDatabase.sync();
});

afterAll(async () => {
  await sequelizeDatabase.drop();
});

DESCRIBE('Auth router', () => {
  it('creates a user', async () => {
    let response = await request.post('/signup')
  })
});