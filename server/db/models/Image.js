const fs = require('fs');
const conn = require('../conn');
const { Sequelize } = conn;

// used to store images for both challenges and userchallenges
// storing images as BLOB data

const Image = conn.define('image', {
  // from associations: challengeId, userchallengeId
  connector: Sequelize.STRING, // only need for seeding ?
  data: Sequelize.BLOB,
});

Image.saveImage = (pathToImage, userchallengeId) => {
  return Image.findOne({ where: { userchallengeId } }).then(async maybeImage => {
    const imageData = fs.readFileSync(pathToImage);
    if (maybeImage) {
      maybeImage.update({ ...maybeImage, data: imageData });
    } else {
      maybeImage = await Image.create({ userchallengeId, data: imageData });
    }

    return maybeImage;
  });
};

module.exports = Image;
