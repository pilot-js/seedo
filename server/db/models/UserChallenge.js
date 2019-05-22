const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('userChallenge', {
  // from associations: userId, challengeId
  html: {
    type: Sequelize.TEXT,
  },
  css: {
    type: Sequelize.TEXT,
  },
  js: {
    type: Sequelize.TEXT,
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
