const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('image', {
  // from associations: challengeId, userchallengeId
  // TODO delete type
  type: {
    type: Sequelize.ENUM('challenge', 'userchallenge'),
  },
  // TODO change to data: - store base64
  // Sequelize.text
  url: {
    type: Sequelize.STRING,
  },
});
