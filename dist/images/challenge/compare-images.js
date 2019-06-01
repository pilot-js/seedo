var fs = require('fs'),
  PNG = require('pngjs').PNG,
  pixelmatch = require('pixelmatch');

var img1 = fs.createReadStream('challenge-1-red-circle.png').pipe(new PNG()).on('parsed', doneReading),
  img2 = fs.createReadStream('challenge-1-red-circle2.png').pipe(new PNG()).on('parsed', doneReading),
  filesRead = 0;

function doneReading() {
  if (++filesRead < 2) return;
  var diff = new PNG({ width: img1.width, height: img1.height });

  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1 });

  diff.pack().pipe(fs.createWriteStream('diff2.png'));

  const percentMatch = Math.round(100 * (1 - (numDiffPixels / (img1.width * img1.height))));

  console.log('percentMatch: ', percentMatch)
}