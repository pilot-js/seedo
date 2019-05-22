const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('image', {
  // from associations: challengeId
  url: {
    type: Sequelize.STRING,
  },
});
