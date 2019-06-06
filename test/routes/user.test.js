require('@babel/polyfill');
const supertest = require('supertest');

const app = require('../../server/app');
const { User, Userchallenge, Challenge, conn } = require('../../server/db');

const client = supertest(app);

describe('User routes', () => {
  beforeAll(async () => {
    await conn.sync({ force: true });
    const user = await User.create({
      email: 'email@email.com',
      password: 'password',
      type: 'user',
    });
    const challenge = await Challenge.create({
      name: 'challenge',
      description: 'challenging',
      difficulty: 3,
    });
    const uc = await Userchallenge.create({
      html: 'TEXT',
      css: 'TEXT',
      js: 'TEXT',
      grade: 90,
      submitted: true,
      userId: user.id,
      challengeId: challenge.id,
    });
  });
  afterAll(() => {
    conn.close();
  });
  it('can create a user', () => {
    return client
      .post('/api/users/')
      .send({ email: 'email2@email.com', password: 'password', type: 'user' })
      .expect(200);
  });
  it('can delete a user by id', () => {
    return User.findOne({ where: { email: 'email2@email.com' } }).then(user => {
      return client.delete(`/api/users/${user.id}`).expect(204);
    });
  });
  it('can get a users submissions and related challenges', () => {
    return User.findOne({ where: { email: 'email@email.com' } })
      .then(user => {
        return client.get(`/api/users/${user.id}/userchallenges`).expect(200);
      })
      .then(res => {
        expect(res.body.length).toBe(1);
        expect(res.body[0].userchallenges).toBeTruthy();
      });
  });
});
