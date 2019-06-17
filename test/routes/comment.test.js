require('@babel/polyfill');
const supertest = require('supertest');

const { User, Challenge } = require('../../server/db/models');
const { conn } = require('../../server/db');
const app = require('../../server/app');

const client = supertest(app);
const url = '/api/comments';

describe('testing the comments routes', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
    const challenge = await Challenge.create({
      name: 'Basic html page',
      description: 'easy html page to do',
      difficulty: 3,
    });
    const user = await User.create({
      firstName: 'test',
      lastName: 'test',
      email: 'email@email.com',
      password: 'password',
      type: 'user',
    });
  });
  afterAll(() => {
    conn.close();
  });
  it('can create a comment', async () => {
    const challenge = await Challenge.findOne({
      where: {
        name: 'Basic html page',
      },
    });
    const user = await User.findOne({
      where: {
        email: 'email@email.com',
      },
    });
    return client
      .post(url)
      .send({
        text: 'this question is hard',
        challengeId: challenge.id,
        userId: user.id,
      })
      .expect(200);
  });
});
