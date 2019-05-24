require('@babel/polyfill');
const { Userchallenge } = require('../../server/db/models');
const db = require('../../server/db/conn');

describe('testing Userchallenge model', () => {
    beforeAll(async () => {
        await db.sync({force: true});
        await Userchallenge.create({html: 'TEXT', css: 'TEXT', js: 'TEXT', grade: 90, submitted: true, imageId: 1});
    });
    afterAll(async () => {
        await db.close();
    });
    it('can retrieve data', async () => {
        const userchallenges = await Userchallenge.findAll();
        return expect(userchallenges.length).toBe(1);
    });
    it('can create a userChallenge', async () => {
        await Userchallenge.create({html: 'TEXT1', css: 'TEXT1', js: 'TEXT1', grade: 0, submitted: false, imageId: 2});
        const allchallenge = await Userchallenge.findAll();
        return expect(allchallenge.length).toBe(2); 
    });
})
