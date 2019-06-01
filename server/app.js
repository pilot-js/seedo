const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const api = require('./routes/api');

try {
  Object.assign(process.env, require('./.env'));
} catch (error) {
  console.log(error);
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

app.use('/api', api);

app.get('/github/login', (req, res, next) => {
  const URL = `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`;
  res.redirect(URL);
});

module.exports = app;
