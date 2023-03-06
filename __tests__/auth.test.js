'use strict';

const { app } = require('../src/server');
const supertest = require('supertest');
const { sequelizeDatabase } = require('../src/auth/models');
const request = supertest(app);

// Turn everything ON
beforeAll(async() => {
  await sequelizeDatabase.sync();
});

// Turn everything OFF
afterAll(async () => {
  await sequelizeDatabase.drop();
});

describe('Auth router', () => {
  it('creates a user', async () => {
    let response = await request.post('/signup').send({
      username: 'Alpha',
      password: 'password',
    });
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('Alpha');
  });
  it('allow user to signin', async () =>{
    let response = await request.post('/signin').auth('Alpha', 'password');
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('Alpha');
  });
});