const fs = require('fs');
const conn = require('../conn');
const { Sequelize } = conn;

// used to store images for both challenges and userchallenges
// storing images as BLOB data

const Image = conn.define('image', {
  // from associations: challengeId, userchallengeId
  connector: Sequelize.STRING, // only need for seeding ?
  data: Sequelize.BLOB,
  height: Sequelize.INTEGER,
  width: Sequelize.INTEGER,
});

Image.saveImage = (pathToImage, userchallengeId) => {
  return Image.findOne({ where: { userchallengeId } }).then(async maybeImage => {
    const imageData = fs.readFileSync(pathToImage);
    if (maybeImage) {
      await maybeImage.update({ ...maybeImage, data: imageData });
    } else {
      maybeImage = await Image.create({ userchallengeId, data: imageData });
    }

    return maybeImage;
  });
};

Image.seedImage = (pathToImage, challengeId) => {
  const imageData = fs.readFileSync(pathToImage);
  return Image.create({ challengeId, data: imageData });
};

module.exports = Image;
