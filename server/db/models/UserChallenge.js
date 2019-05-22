const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('userChallenge', {
  // from associations: userId, challengeId
  html: {
    type: Sequelize.STRING,
  },
  css: {
    type: Sequelize.STRING,
  },
  js: {
    type: Sequelize.STRING,
  },
  submitted: {
    type: Sequelize.BOOLEAN,
  },
  grade: {
    type: Sequelize.INTEGER,
  },
  image: {
    type: Sequelize.STRING,
  },
});
