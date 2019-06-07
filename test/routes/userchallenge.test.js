require('@babel/polyfill');
const supertest = require('supertest');

const app = require('../../server/app');
const { Userchallenge, conn, User, Challenge } = require('../../server/db');

const client = supertest(app);

const url = '/api/userchallenges/';

describe('Userchallenge routes', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
    const u = await User.create({
      email: 'email@email.com',
      password: 'hello',
      type: 'user',
    });
    const c = await Challenge.create({
      name: 'Basic html page',
      description: 'easy html page to do',
      difficulty: 3,
    });
    const uc = await Userchallenge.create({
      html: 'TEXT',
      css: 'TEXT',
      js: 'TEXT',
      grade: 90,
      submitted: true,
      userId: u.id,
      challengeId: c.id,
    });
  });
  afterAll(async () => {
    await conn.close();
  });
  it('can get a userchallenge', () => {
    return Promise.all([
      User.findOne({ where: { email: 'email@email.com' } }),
      Challenge.findOne({ where: { difficulty: 3 } }),
    ]).then(([user, challenge]) => {
      return client.get(`${url}users/${user.id}/challenges/${challenge.id}`).expect(200);
    });
  });
  it('can update a userchallenge', () => {
    return client.put(`${url}1`).expect(200);
  });
  it('can delete a userchallenge', () => {
    return Challenge.findOne({ where: { name: 'Basic html page' } }).then(challenge => {
      return client.delete(`${url}challenge/${challenge.id}`).expect(204);
    });
  });
});
