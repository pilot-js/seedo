require('@babel/polyfill');
const { Userchallenge, Image, User, Challenge } = require('../../server/db/models');
const db = require('../../server/db/conn');

describe('testing Userchallenge model', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
    await Image.create({ connector: 'userchallenge1' });
    const image1 = Image.findOne({ where: { connector: 'userchallenge1' } });
    await Userchallenge.create({
      html: 'TEXT',
      css: 'TEXT',
      js: 'TEXT',
      grade: 90,
      submitted: true,
      imageId: image1.id,
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
    await Image.create({ connector: 'userchallenge2' });
    const image2 = Image.findOne({ where: { connector: 'userchallenge2' } });
    await Userchallenge.create({
      html: 'TEXT1',
      css: 'TEXT1',
      js: 'TEXT1',
      grade: 0,
      submitted: false,
      imageId: image2.id,
    });
    const allchallenge = await Userchallenge.findAll();
    return expect(allchallenge.length).toBe(2);
  });
  it('can create a userchallenge if no user/challenge combination exists', async () => {
    const user = await User.create({ email: 'email@email.com', password: 'password', type: 'user' });
    const challenge = await Challenge.create({
      name: 'hello',
      description: 'description',
      html: 'TEXT',
      css: 'TEXT',
      js: 'TEXT',
      grade: 90,
      submitted: true,
      difficulty: 2,
    });
    const uc = await Userchallenge.getActiveAnswer(user.id, challenge.id);
    return expect(uc).toBeTruthy();
  });
});
