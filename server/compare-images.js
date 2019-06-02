const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

const compareImages = (userchallengePath, challengeImg) => {

  // const img1 = fs
  //   .createReadStream(challengeImg)
  //   .pipe(new PNG())
  //   .on('parsed', doneReading);
  // const img2 = fs
  //   .createReadStream(userchallengePath)
  //   .pipe(new PNG())
  //   .on('parsed', doneReading);
  // let filesRead = 0;

  // function doneReading() {
  //   if (++filesRead < 2) return;
  //   const diff = new PNG({ width: img1.width, height: img1.height });

  //   const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {
  //     threshold: 0.1,
  //   });

  //   diff.pack().pipe(fs.createWriteStream('diff2.png'));

  //   const percentMatch = Math.round(100 * (1 - numDiffPixels / (img1.width * img1.height)));

  //   console.log('percentMatch: ', percentMatch);
  // }

};

module.exports = {
  compareImages,
};
