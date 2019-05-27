const conn = require('./conn');
const {
  usersSeed,
  userchallengeSeed,
  challengesSeed,
  solutionsSeed,
  imagesSeed,
} = require('./seed');

const { Challenge, Image, Solution, User, Userchallenge } = require('./models');

const syncAndSeed = () => {
  return conn
    .sync({ force: true })
    .then(() => {
      return Promise.all([
        Promise.all(usersSeed.map(user => User.create(user))),
        Promise.all(challengesSeed.map(chal => Challenge.create(chal))),
        Promise.all(userchallengeSeed.map(chal => Userchallenge.create(chal))),
        Promise.all(solutionsSeed.map(sol => Solution.create(sol))),
        Promise.all(imagesSeed.map(img => Image.create({ connector: img.connector, data: img.data }))),
      ]);
    })
    .then(([users, challenges, userchallenges, solutions, images]) => {
      return Promise.all([
        userchallenges
          .find(chal => chal.css.includes('circle'))
          .update({ userId: 2, challengeId: 1 }),
        userchallenges
          .find(chal => chal.css.includes('square'))
          .update({ userId: 3, challengeId: 2 }),
        solutions.find(sol => sol.css.includes('circle')).update({ challengeId: 1 }),
        solutions.find(sol => sol.css.includes('square')).update({ challengeId: 2 }),

        images.find(img => img.connector === 'challenge-1').update({ challengeId: 1 }),
        images.find(img => img.connector === 'userchallenge-1').update({ userchallengeId: 1 }),
        images.find(img => img.connector === 'challenge-2').update({ challengeId: 2 }),
        images.find(img => img.connector === 'userchallenge-2').update({ userchallengeId: 2 }),
      ]);
    })
    .catch(err => console.log(err));
};

module.exports = {
  syncAndSeed,
  Challenge,
  Image,
  Solution,
  User,
  Userchallenge,
};
