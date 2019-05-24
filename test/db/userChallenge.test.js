require('@babel/polyfill');
const { Userchallenge } = require('../../server/db/models');
const { Image } = require('../../server/db/models');
const db = require('../../server/db/conn');

describe('testing Userchallenge model', () => {
    beforeAll(async () => {
        await db.sync({force: true});
        await Image.create({type: 'userchallenge', url: 'myUrl'})
        const image1 = Image.findOne({where: {url: 'myUrl'}})
        await Userchallenge.create({html: 'TEXT', css: 'TEXT', js: 'TEXT', grade: 90, submitted: true, imageId: image1.id});
    });
    afterAll(async () => {
        await db.close();
    });
    it('can retrieve data', async () => {
        const userchallenges = await Userchallenge.findAll();
        return expect(userchallenges.length).toBe(1);
    });
    it('can create a userChallenge', async () => {
        await Image.create({type: 'userchallenge', url: 'myUrl2'})
        const image2 = Image.findOne({where: {url: 'myUrl2'}})
        await Userchallenge.create({html: 'TEXT1', css: 'TEXT1', js: 'TEXT1', grade: 0, submitted: false, imageId: image2.id});
        const allchallenge = await Userchallenge.findAll();
        return expect(allchallenge.length).toBe(2); 
    });
})
