require('@babel/polyfill');
const supertest = require('supertest');

const app = require('../../server/app');
const { Userchallenge, conn, User, Challenge } = require('../../server/db');

const client = supertest(app);

const url = '/api/userchallenges/';

describe('Userchallenge routes', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
    await Userchallenge.create({
      html: 'TEXT',
      css: 'TEXT',
      js: 'TEXT',
      grade: 90,
      submitted: true,
    });
    await User.create({
      email: 'email@email.com',
      password: 'hello',
    });
    await Challenge.create({
      name: 'Basic html page',
      description: 'easy html page to do',
      difficulty: 3,
    });
  });
  afterAll(async () => {
    await conn.close();
  });
  it('it can take a request', () => {
    return client.get(`${url}1`).expect(200);
  });
  it('will return a new userchallenge if none exists', () => {
    return client.get(`${url}users/1/challenges/1`).expect(200);
  });
});
