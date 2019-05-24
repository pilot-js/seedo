require('@babel/polyfill');
const { Userchallenge } = require('../../server/db/models');
const { deleteAllRecordsFromModel } = require('../utils');
const db = require('../../server/db/conn');

describe('testing Userchallenge model', () => {
  beforeAll(async () => {
    await deleteAllRecordsFromModel(Userchallenge);
    await Userchallenge.create({
      html: 'TEXT',
      css: 'TEXT',
      js: 'TEXT',
      grade: 90,
      submitted: true,
    });
  });
  afterAll(async () => {
    await db.close();
  });
  it('can retrieve data', async () => {
    const userchallenges = await Userchallenge.findAll();
    return expect(userchallenges.length).toBe(1);
  });
  it('can create a userChallenge', async () => {
    await Userchallenge.create({
      html: 'TEXT1',
      css: 'TEXT1',
      js: 'TEXT1',
      grade: 0,
      submitted: false,
    });
    const allchallenge = await Userchallenge.findAll();
    return expect(allchallenge.length).toBe(2);
  });
});
