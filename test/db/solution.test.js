require('@babel/polyfill');
const { Solution } = require('../../server/db/models');
const db = require('../../server/db/conn');

describe('testing solution model', () => {
    beforeAll(async () => {
        await db.sync({force: true});
        await Solution.create({html: 'html TEXT', css: 'css TEXT', js: 'js TEXT', ChallengeId: 1});
    })
    afterAll(async () => {
        await db.close();
    })
    it('can retrieve data', async () => {
        const solutions = await Solution.findAll();
        return expect(solutions.length).toBe(1);
    })
    it('can create a solution for a challenge', async () => {
        await Solution.create({html: 'html TEXT1', css: 'css TEXT', js: 'js TEXT', ChallengeId: 2});
        const allSolutions = await Solution.findAll();
        return expect(allSolutions.length).toBe(2); 
    })
})