const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('image', {
	// from associations: challengeId, userchallengeId
	type: {
		type: Sequelize.ENUM('challenge', 'userchallenge'),
	},
	url: {
		type: Sequelize.STRING,
	},
});
