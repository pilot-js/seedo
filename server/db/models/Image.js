const conn = require('../conn');
const { Sequelize } = conn;

// used to store images for both challenges and userchallenges
// storing images as BLOB data

module.exports = conn.define('image', {
  // from associations: challengeId, userchallengeId
  connector: Sequelize.STRING, // only need for seeding ?
  data: Sequelize.BLOB('long'),
});
