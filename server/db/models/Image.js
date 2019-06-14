/* eslint indent: 0 */
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

Image.saveImage = (pathToImage, id, isUserchallenge, imageWidth, imageHeight) => {
  return (isUserchallenge
    ? Image.findOne({ where: { userchallengeId: id } })
    : Image.findOne({ where: { challengeId: id } })
  ).then(async maybeImage => {
    const imageData = fs.readFileSync(pathToImage);
    if (maybeImage) {
      await maybeImage.update({ ...maybeImage, data: imageData });
    } else {
      maybeImage = isUserchallenge
        ? await Image.create({ userchallengeId: id, data: imageData })
        : await Image.create({
            challengeId: id,
            data: imageData,
            width: imageWidth,
            height: imageHeight,
          });
    }
    return maybeImage;
  });
};

Image.seedImage = (pathToImage, challengeId, height, width) => {
  const imageData = fs.readFileSync(pathToImage);
  return Image.create({ challengeId, data: imageData, height, width });
};

module.exports = Image;
