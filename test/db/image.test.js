// require polyfill for async functions in tests
require('@babel/polyfill');
const path = require('path');
const { Image, Userchallenge } = require('../../server/db/models');
const db = require('../../server/db/conn');

const pathToImage = path.join(
  __dirname,
  '..',
  '..',
  'dist',
  'images',
  'userchallenge',
  'userchallenge-1.png',
);

describe('testing image model', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
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
  it('can create an image', async () => {
    const uc = await Userchallenge.findOne({ where: { html: 'TEXT' } });
    const image = await Image.create({
      userchallengeId: uc.id,
      data: 'somedata',
      width: 150,
      height: 150,
    });
    console.log('image: ', image.get());
    expect(image).toBeTruthy();
  });
  describe('Image.saveImage tests', () => {
    it('can create a new record for the image', async () => {
      const uc = await Userchallenge.create({
        html: 'TEXT',
        css: 'TEXT',
        js: 'TEXT',
        grade: 90,
        submitted: true,
      });
      const image = await Image.saveImage(pathToImage, uc.id, true, 150, 150);
      expect(image).toBeTruthy();
    });
    it('can update an image record in the database', async () => {
      const uc = await Userchallenge.findOne({ where: { html: 'TEXT' } });
      const testImage = await Image.findOne({ where: { userchallengeId: uc.id } });
      const image = await Image.saveImage(pathToImage, uc.id, true, 150, 150);
      expect(testImage === image).toBe(false);
      expect(image).toBeTruthy();
    });
  });
});
