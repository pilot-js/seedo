const Challenge = require('./Challenge');
const Image = require('./Image');
const Solution = require('./Solution');
const User = require('./User');
const Userchallenge = require('./Userchallenge');
const Comment = require('./Comment');

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

User.hasMany(Comment);
Challenge.hasMany(Comment);

Comment.belongsTo(User);
Comment.belongsTo(Challenge);

Userchallenge.getActiveAnswer = (userId, challengeId) => {
  return Userchallenge.findOne({
    where: { userId, challengeId, submitted: false },
    include: [Image],
  }).then(async entity => {
    let activeSolution;
    // if an unsubmitted answer was found, return it
    if (entity) {
      activeSolution = entity;
      // otherwise, create a new userchallenge and return it
    } else {
      activeSolution = Userchallenge.create({
        userId,
        challengeId,
        html: '',
        css: '',
        js: '',
        submitted: false,
      });
    }
    return activeSolution;
  });
};

module.exports = {
  Challenge,
  Image,
  Solution,
  User,
  Userchallenge,
  Comment,
};
