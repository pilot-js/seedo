const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('solution', {
  // from associations: challengeId
  html: {
    type: Sequelize.STRING,
  },
  css: {
    type: Sequelize.STRING,
  },
  js: {
    type: Sequelize.STRING,
  },
});
