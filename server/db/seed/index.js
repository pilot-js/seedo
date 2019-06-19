const fs = require('fs');
const { Challenge, Image, Solution, User, Comment } = require('../models');
const conn = require('../conn');
const { usersSeed } = require('./user');
const { challengesSeed } = require('./challenge');
const { solutionsSeed } = require('./solution');
const { commentSeed } = require('./comment');
const utils = require('../../puppeteer-utils');

const seedUser = () => {
  return Promise.all(usersSeed.map(user => User.create(user)));
};

const seedComment = () => {
  return Promise.all(commentSeed.map(comment => Comment.create(comment)));
};

const seedChallenge = () => {
  return challengesSeed.reduce((promiseChain, currentTask) => {
    return promiseChain.then(chainResults =>
      Challenge.create(currentTask).then(currentResult => [...chainResults, currentResult]),
    );
  }, Promise.resolve([]));
};

const seedSolution = () => {
  return solutionsSeed.reduce((promiseChain, currentTask) => {
    return promiseChain.then(chainResults =>
      Solution.create(currentTask).then(currentResult => [...chainResults, currentResult]),
    );
  }, Promise.resolve([]));
};

const syncAndSeed = () => {
  return conn
    .sync({ force: true })
    .then(() => {
      return Promise.all([seedUser(), seedChallenge(), seedSolution(), seedComment()]);
    })
    .then(([users, challenges, solutions, comments]) => {
      return Promise.all([
        solutions.map((sol, idx) => sol.update({ challengeId: challenges[idx].id })),
        solutions.map(async sol => {
          const dirname = './server/db/seed/images/';
          await utils.createFiles(sol.html, sol.css, sol.id, dirname);
          const data = await utils.seedImage(sol.html, sol.css, 'seed', sol.challengeId);
          return Image.create({ challengeId: sol.challengeId, width: 600, height: 337, data });
        }),
        comments.map((comment, idx) => {
          return comment.update({ userId: users[idx].id, challengeId: challenges[idx].id });
        }),
      ]).catch(err => console.log(err));
    });
};

syncAndSeed();

module.exports = syncAndSeed;
