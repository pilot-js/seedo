require('@babel/polyfill');
const supertest = require('supertest');

const app = require('../../server/app');
const { Userchallenge, conn, User, Challenge } = require('../../server/db');

const client = supertest(app);

const url = '/api/userchallenges/';
describe('Userchallenge routes', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
    const user = await User.create({
      email: 'email@email.com',
      password: 'hello',
    });
    await Userchallenge.create({
      html: 'TEXT',
      css: 'TEXT',
      js: 'TEXT',
      grade: 90,
      submitted: true,
      userId: user.id,
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
  it('it can take a request', async () => {
    const user = await User.findOne({ where: { email: 'email@email.com'}})
    return client
      .put(`${url}1`)
      .send({ userAnswer: { 
        userId: user.id,
        html: 'TEXT',
        css: 'TEXT',
        js: 'TEXT',
        grade: 90,
        submitted: true,  
      } })
      .expect(200);
  });
});
