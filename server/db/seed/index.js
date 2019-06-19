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
  return Promise.all(challengesSeed.map(challenge => Challenge.create(challenge)));
};

const seedSolution = () => {
  return Promise.all(solutionsSeed.map(solution => Solution.create(solution)));
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
        comments.map((comment, idx) => {
          return comment.update({ userId: users[idx].id, challengeId: challenges[idx].id });
        }),
      ])
        .then(async () => {
          const solutions = await Solution.findAll();
          await (async function loop() {
            for (let i = 0; i < solutions.length; i++) {
              const sol = solutions[i];
              console.log(sol.get());
              const data = await utils.seedImage(sol.html, sol.css, 'seed', sol.challengeId);
              console.log('generated data');
              await Image.create({ challengeId: sol.challengeId, width: 600, height: 337, data });
            }
          })();
        })
        .catch(err => console.log(err));
    });
};

syncAndSeed();

module.exports = syncAndSeed;
