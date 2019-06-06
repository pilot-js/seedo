const conn = require('./conn');
const { Challenge, Image, Solution, User, Userchallenge, Comment } = require('./models');

module.exports = {
  Challenge,
  Image,
  Solution,
  User,
  Userchallenge,
  Comment,
  conn,
};
