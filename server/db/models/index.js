const Challenge = require('./Challenge');
const Image = require('./Image');
const Solution = require('./Solution');
const User = require('./User');
const Userchallenge = require('./Userchallenge');

// Associations

User.hasMany(Userchallenge);
Userchallenge.belongsTo(User);

Challenge.hasMany(Userchallenge);
Userchallenge.belongsTo(Challenge);

Challenge.hasMany(Image);
Image.belongsTo(Challenge);

Userchallenge.hasMany(Image);
Image.belongsTo(Userchallenge);

Challenge.hasMany(Solution);
Solution.belongsTo(Challenge);

module.exports = {
  Challenge,
  Image,
  Solution,
  User,
  Userchallenge,
};
