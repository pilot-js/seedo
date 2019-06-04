/* eslint no-use-before-define: 1 */
const fs = require('fs');
// const btoa = require('btoa');
const stream = require('stream');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

function compareImages(userchallengePath, challengeImg, userId) {
  // console.log('challengeImg buffer: ', Buffer.from(challengeImg.data))
  console.log('challengeImg: ', challengeImg.data);
  console.log('userchallengePath: ', userchallengePath);
  console.log('userchallengeId: ', userId);
  // const img1 = challengeImg;
  // let buff = Buffer.from(challengeImg);
  // fs.writeFileSync('chall.png', challengeImg);
  // const newUint8Array = btoa(String.fromCharCode(...new Uint8Array(challengeImg.data)));
  // console.log('newUint8Array: ', newUint8Array);
  // const base64String = btoa(String.fromCharCode(...new Uint8Array(challengeImg.data)));
  // console.log('Base64 image data converted to file: ', base64String)

  const buffStream = new stream.PassThrough();
  buffStream.end(challengeImg.data);
  const img1 = buffStream.pipe(new PNG()).on('parsed', doneReading);
  // const img1 = fs
  //   .createReadStream(challengeImg.data)
  //   .pipe(new PNG())
  //   .on('parsed', doneReading);
  const img2 = fs
    .createReadStream(userchallengePath)
    .pipe(new PNG())
    .on('parsed', doneReading);
  let filesRead = 0;

  function doneReading() {
    if (++filesRead < 2) {
      console.log('First file completed reading.');
      return;
    }
    console.log('img1.data: ', img1.data);
    const diff = new PNG({ width: img1.width, height: img1.height });
    const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {
      threshold: 0.1,
    });
    diff.pack().pipe(fs.createWriteStream('diff2.png'));
    const percentMatch = Math.round(100 * (1 - numDiffPixels / (img1.width * img1.height)));
    console.log('percentMatch: ', percentMatch);
  }
}

module.exports = {
  compareImages,
};
