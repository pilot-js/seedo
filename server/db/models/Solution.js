const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('solution', {
  // from associations: challengeId
  html: {
    type: Sequelize.TEXT,
  },
  css: {
    type: Sequelize.TEXT,
  },
  js: {
    type: Sequelize.TEXT,
  },
});
