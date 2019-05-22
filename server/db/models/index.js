const Challenge = require('./Challenge');
const Image = require('./Image');
const Solution = require('./Solution');
const User = require('./User');
const UserChallenge = require('./UserChallenge');

// Associations

User.hasMany(UserChallenge);
Challenge.hasMany(UserChallenge);

UserChallenge.belongsTo(Challenge);
UserChallenge.belongsTo(User);

Challenge.hasMany(Image);
Image.belongsTo(Challenge);

Challenge.hasMany(Solution);
Solution.belongsTo(Challenge);

module.exports = {
  Challenge,
  Image,
  Solution,
  User,
  UserChallenge,
};
