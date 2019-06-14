const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');

const { Image } = require('./db');

const parseHTML = (html, userId) => {
  return `<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
      <link rel="stylesheet" href="${userId}.css">
  </head>
  <body>
      ${html}
  </body>
  </html>`;
};

const createFiles = async (html, css, userId, dir) => {
  await fs.mkdir(dir, { recursive: true }, err => {
    if (err) throw err;
    console.log('create dir: ', dir);
  });
  await fs.writeFile(`${dir}${userId}.html`, parseHTML(html, userId), err => {
    if (err) throw err;
    console.log('The html has been saved!');
  });
  await fs.writeFile(`${dir}${userId}.css`, css, err => {
    if (err) throw err;
    console.log('The css has been saved!');
  });
};

const puppy = async () => {
  const args = ['-–no-sandbox', '-–disable-setuid-sandbox'];
  const browser = await puppeteer.launch({ args });
  const page = await browser.newPage();
  await browser.close();
  return 'hello';
};

const createImage = async (userId, challengeId, dir) => {
  try {
    const image = await Image.findOne({ where: { challengeId } });
    // const args = ['-–no-sandbox', '-–disable-setuid-sandbox'];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const retPath = `file://${path.join(process.cwd(), `${dir}${userId}.html`)}`;
    await page.goto(retPath);
    await page.setViewport({ width: image.width, height: image.height });
    await page.screenshot({ path: `${dir}${userId}.png` });
    await browser.close();
    return retPath;
  } catch (err) {
    console.log('error from createImage: ', err);
  }
};

const seedImage = async (fileName, dir) => {
  try {
    // const args = ['-–no-sandbox', '-–disable-setuid-sandbox'];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const retPath = `file://${path.join(process.cwd(), `${dir}${fileName}.html`)}`;
    await page.goto(retPath);
    await page.setViewport({ width: 600, height: 337 });
    await page.screenshot({ path: `${dir}${fileName}.png` });
    await browser.close();
    return retPath;
  } catch (err) {
    console.log('error from seedImage: ', err);
  }
};

module.exports = {
  createFiles,
  createImage,
  seedImage,
  puppy,
};
