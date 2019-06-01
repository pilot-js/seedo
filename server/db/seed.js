const fs = require('fs');

const usersSeed = [
  { email: 'grant@geezemail.com', password: '1234' },
  { email: 'kristy@geezemail.com', password: '1234' },
  { email: 'haoyu@geezemail.com', password: '1234' },
  { email: 'thee@geezemail.com', password: '1234' },
];

// from associations: imageId
const challengesSeed = [
  {
    name: 'Make circle',
    description: 'Make a red circle with radius 100px',
    difficulty: 1,
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
  { type: 'challenge', url: 'challenge-1-red-circle.png', connector: 'challenge-1' },
  { type: 'challenge', url: 'challenge-2-blue-square.png', connector: 'challenge-2' },
  { type: 'challenge', url: 'challenge-3-yellow-rectangle.png', connector: 'challenge-3' },
  { type: 'challenge', url: 'challenge-4-orange-rectangle.png', connector: 'challenge-4' },
  { type: 'userchallenge', url: 'userchallenge-1.png', connector: 'userchallenge-1' },
  { type: 'userchallenge', url: 'userchallenge-2.png', connector: 'userchallenge-2' },
];

const currDir = process.cwd();
const imagesSeed = images.map(image => {
  image.data = fs.readFileSync(`${currDir}/dist/images/${image.type}/${image.url}`);
  return image;
});

module.exports = {
  usersSeed,
  userchallengeSeed,
  challengesSeed,
  solutionsSeed,
  imagesSeed,
};
