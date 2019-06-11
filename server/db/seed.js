const fs = require('fs');
const { Challenge, Image, Solution, User, Userchallenge } = require('./models');
const conn = require('./conn');

const usersSeed = [
  {
    firstName: 'Grant',
    lastName: 'H',
    email: 'grant@geezemail.com',
    password: '1234',
    type: 'user',
  },
  {
    firstName: 'Kristy',
    lastName: 'C',
    email: 'kristy@geezemail.com',
    password: '1234',
    type: 'user',
  },
  {
    firstName: 'Haoyu',
    lastName: 'Y',
    email: 'haoyu@geezemail.com',
    password: '1234',
    type: 'user',
  },
  { firstName: 'Theo', lastName: 'M', email: 'thee@geezemail.com', password: '1234', type: 'user' },
  { firstName: 'Admin', lastName: 'Admin', email: 'a@a.com', password: 'a', type: 'admin' },
];

// from associations: imageId
const challengesSeed = [
  {
    name: 'Make circle',
    description: 'Make a red circle with radius 100px',
    difficulty: 1,
    html: 'dummy data',
    css: 'dummy data',
    js: 'dummy data',
  },
  {
    name: 'Make square',
    description: 'Make a blue square that is 100px wide and high',
    difficulty: 1,
  },
  {
    name: 'Make rectangle',
    description: 'Make a yellow rectangle that is 200px wide and 100px high',
    difficulty: 2,
  },
  {
    name: 'Make rectangle',
    description: 'Make an orange rectangle that is 100px wide and 200px high',
    difficulty: 2,
  },
];

// TODO for js - console.log()

// from associations: userId, challengeId, imageId
const userchallengeSeed = [
  {
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title>Circle</title>
      </head>
      <body>
        <div id='circle'></div>
      </body>
    </html>`,
    css: `#circle {
      width: 100px;
      height: 100px;
      background-color: red;
      border-radius: 50%;
    }`,
    js: '',
    submitted: true,
    grade: 5,
  },
  {
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title>Square</title>
      </head>
      <body>
        <div id='square'></div>
      </body>
    </html>`,
    css: `#square {
      width: 50px;
      height: 50px;
      background-color: blue;
    }`,
    js: '',
    submitted: true,
    grade: 4,
  },
  {
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title>Rectangle</title>
      </head>
      <body>
        <div id='rectangle'></div>
      </body>
    </html>`,
    css: `#rectangle {
      width: 200px;
      height: 100px;
      background-color: yellow;
    }`,
    js: '',
    submitted: false,
  },
  {
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title>Rectangle</title>
      </head>
      <body>
        <div id='rectangle'></div>
      </body>
    </html>`,
    css: `#rectangle {
      width: 100px;
      height: 200px;
      background-color: orange;
    }`,
    js: '',
    submitted: false,
  },
];

// from associations: challengeId
const solutionsSeed = [
  {
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title>Circle</title>
      </head>
      <body>
        <div id='circle'></div>
      </body>
    </html>`,
    css: `#circle {
      width: 100px;
      height: 100px;
      background-color: red;
      border-radius: 50%;
    }`,
    js: '',
  },
  {
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title>Circle</title>
      </head>
      <body>
        <div id='square'></div>
      </body>
    </html>`,
    css: `#square {
      width: 100px;
      height: 100px;
      background-color: blue;
    }`,
    js: '',
  },
  {
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title>Rectangle</title>
      </head>
      <body>
        <div id='rectangle'></div>
      </body>
    </html>`,
    css: `#rectangle {
      width: 200px;
      height: 100px;
      background-color: yellow;
    }`,
    js: '',
    submitted: false,
  },
  {
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title>Rectangle</title>
      </head>
      <body>
        <div id='rectangle'></div>
      </body>
    </html>`,
    css: `#rectangle {
      width: 100px;
      height: 200px;
      background-color: orange;
    }`,
    js: '',
    submitted: false,
  },
];

// from associations: challengeId, userchallengeId
const images = [
  {
    type: 'challenge',
    url: 'challenge-1-red-circle.png',
    connector: 'challenge-1',
    width: 100,
    height: 100,
  },
  {
    type: 'challenge',
    url: 'challenge-2-blue-square.png',
    connector: 'challenge-2',
    width: 100,
    height: 100,
  },
  {
    type: 'challenge',
    url: 'challenge-3-yellow-rectangle.png',
    connector: 'challenge-3',
    width: 200,
    height: 100,
  },
  {
    type: 'challenge',
    url: 'challenge-4-orange-rectangle.png',
    connector: 'challenge-4',
    width: 100,
    height: 200,
  },
  { type: 'userchallenge', url: 'userchallenge-1.png', connector: 'userchallenge-1' },
  { type: 'userchallenge', url: 'userchallenge-2.png', connector: 'userchallenge-2' },
  { type: 'userchallenge', url: 'userchallenge-3.png', connector: 'userchallenge-3' },
  { type: 'userchallenge', url: 'userchallenge-4.png', connector: 'userchallenge-4' },
];

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
