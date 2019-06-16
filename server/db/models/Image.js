/* eslint indent: 0 */
const fs = require('fs');
const conn = require('../conn');
const utils = require('../../puppeteer-utils');
const { Sequelize } = conn;

// used to store images for both challenges and userchallenges
// storing images as BLOB data

const Image = conn.define('image', {
  // from associations: challengeId, userchallengeId
  connector: Sequelize.STRING, // only need for seeding ?
  data: Sequelize.TEXT,
  height: Sequelize.INTEGER,
  width: Sequelize.INTEGER,
});

Image.saveImage = (pathToImage, id, isUserchallenge, width, height) => {
  return (isUserchallenge
    ? Image.findOne({ where: { userchallengeId: id } })
    : Image.findOne({ where: { challengeId: id } })
  ).then(async maybeImage => {
    const imageData = fs.readFileSync(pathToImage);
    if (maybeImage) {
      await maybeImage.update({
        ...maybeImage,
        data: imageData,
        width,
        height,
      });
    } else {
      maybeImage = isUserchallenge
        ? await Image.create({ userchallengeId: id, data: imageData })
        : await Image.create({
            challengeId: id,
            data: imageData,
            width,
            height,
          });
    }
    return maybeImage;
  });
};

Image.seedImage = (html, css, challengeId, height, width) => {
  const data = utils.createImage(html, css, 'seed', challengeId, width, height);
  return Image.create({ challengeId, data, height, width });
};

module.exports = Image;
