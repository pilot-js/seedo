const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const api = require('./routes/api');
const auth = require('./routes/auth');
const { puppy } = require('./puppeteer-utils');

try {
  Object.assign(process.env, require('./.env')); // eslint-disable-line global-require
} catch (error) {
  console.log('Could not find .env file.'); // eslint-disable-line no-console
}

app.use(
  session({
    secret: process.env.SESSION,
    name: 'seedoUser',
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(express.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.use(morgan('dev'));

app.get('/puppy', (req, res, next) => {
  puppy()
    .then(() => res.sendStatus(200))
    .catch(next);
});
app.use('/api', api);
app.use('/auth', auth);

app.get('/github/login', (req, res, next) => {
  const URL = `https://github.com/login/oauth/authorize?client_id=${
    process.env.CLIENT_ID
  }&scope=repo_deployment`;
  res.redirect(URL);
});

module.exports = app;
