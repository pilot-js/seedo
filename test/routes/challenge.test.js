// require polyfill for async functions in tests
require('@babel/polyfill');
const supertest = require('supertest');
const { Challenge, Image, User, Comment } = require('../../server/db/models');
const db = require('../../server/db/conn');
const app = require('../../server/app');

const client = supertest(app);
const url = '/api/challenges/';

describe('testing the challenges routes', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
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
    const comment = await Comment.create({
      userId: user.id,
      challengeId: challenge.id,
      text: 'i <3 this challenge',
    });
    const image = await Image.create({
      challengeId: challenge.id,
      data: 'some data is here lol',
    });
  });
  afterAll(async () => {
    await db.close();
  });
  it('can get all challenges with their images', async () => {
    await Challenge.create({
      name: 'hard html page',
      description: 'hard html page to do',
      difficulty: 4,
    });
    return client
      .get(`${url}`)
      .expect(200)
      .then(res => {
        expect(res.body.length).toBe(2);
        expect(res.body[0].images.length).toBe(1);
      });
  });
  it('can get all comments and images for a challenge', async () => {
    const c = await Challenge.findByPk(1, {
      include: [Image, Comment],
    });

    return client
      .get(`${url}1`)
      .expect(200)
      .then(res => {
        expect(res.body.images).toBeTruthy();
        expect(res.body.images.length).toBe(1);
      });
  });
});
