const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

app.use(express.static(path.join(__dirname, '../dist')));

app.use(morgan('dev'));

module.exports = app;
