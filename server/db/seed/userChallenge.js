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

module.exports = {
  userchallengeSeed,
};
