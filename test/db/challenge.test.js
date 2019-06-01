// require polyfill for async functions in tests
require('@babel/polyfill');
const { Challenge } = require('../../server/db/models');
const db = require('../../server/db/conn');

describe('testing challenge model', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
    await Challenge.create({
      name: 'Basic html page',
      description: 'easy html page to do',
      difficulty: 3,
    });
  });
  afterAll(async () => {
    await db.close();
  });

  it('can retrieve data', async () => {
    const challenges = await Challenge.findAll();
    return expect(challenges.length).toBe(1);
  });

  it('requires that name is not empty or null', async () => {
    await expect(
      Challenge.create({
        description: 'easy html page to do',
        difficulty: 3,
      }),
    ).rejects.toThrow();
    await expect(
      Challenge.create({
        name: null,
        description: 'easy html page to do',
        difficulty: 3,
      }),
    ).rejects.toThrow();
  });

  it('requires that description is not empty or null', async () => {
    await expect(
      Challenge.create({
        name: 'hello',
        difficulty: 3,
      }),
    ).rejects.toThrow();
    await expect(
      Challenge.create({
        name: 'hello',
        description: null,
        difficulty: 3,
      }),
    ).rejects.toThrow();
  });

  it('has a minimum and maximum for the difficulty', async () => {
    await expect(
      Challenge.create({
        name: 'hello',
        description: 'this works',
        difficulty: 0,
      }),
    ).rejects.toThrow();
    await expect(
      Challenge.create({
        name: 'hello',
        description: 'this works',
        difficulty: 7,
      }),
    ).rejects.toThrow();
  });
});
