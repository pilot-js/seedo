require('@babel/polyfill');
const { UserChallenge } = require('../../server/db/models');
const db = require('../../server/db/conn');

describe('testing UserChallenge model', () => {
    beforeAll(async () => {
        await db.sync({force: true});
        await UserChallenge.create({html: 'TEXT', css: 'TEXT', js: 'TEXT', grade: 90, submited: true, image: 'STRING'});
    });
    afterAll(async () => {
        await db.close();
    });
    it('can retrieve data', async () => {
        const userChallenges = await UserChallenge.findAll();
        return expect(userChallenges.length).toBe(1);
    });
    it('can create a userChallenge', async () => {
        await UserChallenge.create({html: 'TEXT1', css: 'TEXT1', js: 'TEXT1', grade: 0, submited: false, image: 'STRING'});
        const allChallenge = await UserChallenge.findAll();
        return expect(allChallenge.length).toBe(2); 
    });
})