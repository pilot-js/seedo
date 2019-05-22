const Challenge = require('./Challenge');
const Image = require('./Image');
const Solution = require('./Solution');
const User = require('./User');
const UserChallenge = require('./UserChallenge');

// Associations

User.hasMany(UserChallenge);
UserChallenge.belongsTo(User);

Challenge.hasMany(UserChallenge);

Image.hasOne(Challenge);

Challenge.hasOne(Solution);

module.exports = {
	Challenge,
	Image,
	Solution,
	User,
	UserChallenge,
};