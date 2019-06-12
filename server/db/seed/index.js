const fs = require('fs');
const { Challenge, Image, Solution, User, Userchallenge } = require('../models');
const conn = require('../conn');
const { usersSeed } = require('./user');
const { challengesSeed } = require('./challenge');
const { userchallengeSeed } = require('./userChallenge');
const { solutionsSeed } = require('./solution');
const { images } = require('./image');

// from associations: imageId

// TODO for js - console.log()

// from associations: userId, challengeId, imageId

// from associations: challengeId

// from associations: challengeId, userchallengeId

const currDir = process.cwd();
const imagesSeed = images.map(image => {
  image.data = fs.readFileSync(`${currDir}/dist/images/${image.type}/${image.url}`);
  return image;
});

function getRandom(type, max) {
  const randInt = Math.floor(Math.random() * Math.floor(max));
  return type[randInt].get().id;
}

const syncAndSeed = () => {
  return (
    conn
      .sync({ force: true })
      .then(() => {
        return Promise.all([
          Promise.all(usersSeed.map(user => User.create(user))),
          Promise.all(challengesSeed.map(chal => Challenge.create(chal))),
          Promise.all(userchallengeSeed.map(chal => Userchallenge.create(chal))),
          Promise.all(solutionsSeed.map(sol => Solution.create(sol))),
          Promise.all(
            imagesSeed.map(img =>
              Image.create({
                connector: img.connector,
                data: img.data,
                width: img.width,
                height: img.height,
              }),
            ),
          ),
        ]);
      })
      .then(([users, challenges, userchallenges, solutions, images]) => {
        return Promise.all([
          userchallenges
            .find(chal => chal.css.includes('circle'))
            .update({ userId: getRandom(users, 3), challengeId: 1 }),
          userchallenges
            .find(chal => chal.css.includes('square'))
            .update({ userId: getRandom(users, 3), challengeId: 2 }),
          userchallenges
            .find(chal => chal.css.includes('yellow'))
            .update({ userId: getRandom(users, 3), challengeId: 3 }),
          userchallenges
            .find(chal => chal.css.includes('orange'))
            .update({ userId: getRandom(users, 3), challengeId: 4 }),
          solutions.find(sol => sol.css.includes('circle')).update({ challengeId: 1 }),
          solutions.find(sol => sol.css.includes('square')).update({ challengeId: 2 }),
          solutions.find(sol => sol.css.includes('yellow')).update({ challengeId: 3 }),
          solutions.find(sol => sol.css.includes('orange')).update({ challengeId: 4 }),

          images.find(img => img.connector === 'challenge-1').update({ challengeId: 1 }),
          images.find(img => img.connector === 'userchallenge-1').update({ userchallengeId: 1 }),
          images.find(img => img.connector === 'challenge-2').update({ challengeId: 2 }),
          images.find(img => img.connector === 'userchallenge-2').update({ userchallengeId: 2 }),
          images.find(img => img.connector === 'challenge-3').update({ challengeId: 3 }),
          images.find(img => img.connector === 'userchallenge-3').update({ userchallengeId: 3 }),
          images.find(img => img.connector === 'challenge-4').update({ challengeId: 4 }),
          images.find(img => img.connector === 'userchallenge-4').update({ userchallengeId: 4 }),
        ]);
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error(err))
  );
};

syncAndSeed();

module.exports = syncAndSeed;
