const conn = require('../conn');
const { Sequelize } = conn;

// used to store images for both challenges and userchallenges
// storing images as base64 data

module.exports = conn.define('image', {
  // from associations: challengeId, userchallengeId
  data: {
    type: Sequelize.BLOB('long'),
  },
});
