const fs = require('fs');
const { Challenge, Image, Solution, User, Userchallenge } = require('../models');
const conn = require('../conn');
const { usersSeed } = require('./user');
const { challengesSeed } = require('./challenge');
const { userchallengeSeed } = require('./userChallenge'); // may delete later
const { solutionsSeed } = require('./solution');
const { images } = require('./image');
const utils = require('../../puppeteer-utils');

const seedUser = () => {
  return Promise.all(usersSeed.map(user => User.create(user)));
};
const seedChallenge = () => {
  return Promise.all(challengesSeed.map(chal => Challenge.create(chal)));
};
const seedSolution = () => {
  return Promise.all(solutionsSeed.map(sol => Solution.create(sol)));
};

function getRandom(type, max) {
  const randInt = Math.floor(Math.random() * Math.floor(max));
  return type[randInt].get().id;
}

const syncAndSeed = () => {
  return conn
    .sync({ force: true })
    .then(() => {
      return Promise.all([seedUser(), seedChallenge(), seedSolution()]);
    })
    .then(([users, challenges, solutions]) => {
      return Promise.all([
        solutions.map((sol, idx) => sol.update({ challengeId: idx + 1 })),
        solutions.map(async sol => {
          const dirname = './server/db/seed/images/';
          await utils.createFiles(sol.html, sol.css, sol.id, dirname);
          const retImagePath = await utils.seedImage(sol.id, dirname);
          const imagePath = retImagePath.replace('file://', '').replace('.html', '.png');
          return Image.seedImage(imagePath, sol.challengeId, 337, 600);
        }),
      ]);
    });
};

syncAndSeed();

module.exports = syncAndSeed;
