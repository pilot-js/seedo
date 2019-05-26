require('@babel/polyfill');
const { Solution } = require('../../server/db/models');
const { Challenge } = require('../../server/db/models');
const db = require('../../server/db/conn');

describe('testing solution model', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
    await Challenge.create({ name: 'challenge1', description: 'draw a circle', difficulty: 1 });
    const challenge1 = await Challenge.findOne({ where: { name: 'challenge1' } });
    await Solution.create({
      html: 'html TEXT',
      css: 'css TEXT',
      js: 'js TEXT',
      challengeId: challenge1.id,
    });
  });
  afterAll(async () => {
    await db.close();
  });
  it('can retrieve data', async () => {
    const solutions = await Solution.findAll();
    return expect(solutions.length).toBe(1);
  });
  it('can create a solution for a challenge', async () => {
    const challenge1 = await Challenge.findOne({ where: { name: 'challenge1' } });
    await Solution.create({
      html: 'html TEXT1',
      css: 'css TEXT',
      js: 'js TEXT',
      challengeId: challenge1.id,
    });
    const allSolutions = await Solution.findAll();
    return expect(allSolutions.length).toBe(2);
  });
});
