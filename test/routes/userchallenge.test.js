require('@babel/polyfill');
const supertest = require('supertest');

const app = require('../../server/app');
const { Userchallenge, conn, User, Challenge } = require('../../server/db');

const client = supertest(app);

const url = '/api/userchallenges/';
const uuid = '0d5e2df8-3ebd-4139-b752-da1dc4157b77'
describe('Userchallenge routes', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
    await Userchallenge.create({
      html: 'TEXT',
      css: 'TEXT',
      js: 'TEXT',
      grade: 90,
      submitted: true,
      userId: uuid,
    });
    const ucs = await Userchallenge.findAll();
    console.log('Our user challenges', ucs);
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
    return client
      .put(`${url}1`)
      .send({ userAnswer: {} })
      .expect(200);
  });
});
