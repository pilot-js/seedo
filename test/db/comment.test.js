require('@babel/polyfill');
const { Comment, Challenge, User } = require('../../server/db/models');
const db = require('../../server/db/conn');

describe('testing comment model', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
    await Challenge.create({ name: 'challenge1', description: 'draw a circle', difficulty: 2 });
    await User.create({
      firstName: 'test',
      lastName: 'test',
      email: 'email@email.com',
      password: 'hello',
      type: 'user',
    });
    await Comment.create({ text: 'This question is hard' });
  });
  afterAll(async () => {
    await db.close();
  });
  it('can retrieve data', async () => {
    const comments = await Comment.findAll();
    return expect(comments.length).toBe(1);
  });
  it('can create a comment for a challenge by a user', async () => {
    const user = await User.findOne({ where: { email: 'email@email.com' } });
    const challenge = await Challenge.findOne({ where: { name: 'challenge1' } });
    await Comment.create({
      text: 'this question is easy',
      userId: user.id,
      challengeId: challenge.id,
    });
    const comment = await Comment.findOne({
      where: {
        userId: user.id,
        challengeId: challenge.id,
      },
    });
    await expect(comment.userId).toBe(user.id);
    await expect(comment.challengeId).toBe(challenge.id);
  });
});
