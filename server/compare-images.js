/* eslint no-use-before-define: 1 */
/* eslint no-inner-declarations: 1 */
const fs = require('fs');
const stream = require('stream');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

function compareImages(userchallengePath, challengeImg) {
  // use promise so that can return percentMatch
  return new Promise((resolve, reject) => {
    try {
      let percentMatch = 0;
      let filesRead = 0;

      function doneReading() {
        if (++filesRead < 2) {
          return;
        }
        const diff = new PNG({ width: img1.width, height: img1.height });

        // calc # of pixels different
        const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {
          threshold: 0.1,
        });
        diff
          .pack()
          .pipe(fs.createWriteStream(`${dir}diff-image.png`))
          .on('finish', () => {
            percentMatch = Math.round(100 * (1 - numDiffPixels / (img1.width * img1.height)));
            resolve(percentMatch);
          });
      }

      const challengeImageName = 'challenge-image.png';
      const dir = `${__dirname}/tmp/`;
      const challengePath = dir + challengeImageName;

      // convert challenge image from binary to PNG
      fs.writeFileSync(challengePath, challengeImg.data);

      // convert images to correct format to compare pixels
      const img1 = fs
        .createReadStream(challengePath)
        .pipe(new PNG())
        .on('parsed', doneReading);

      const img2 = fs
        .createReadStream(userchallengePath)
        .pipe(new PNG())
        .on('parsed', doneReading);

    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  compareImages,
};
