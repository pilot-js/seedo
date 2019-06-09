const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');

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

const createFiles = async (html, css, userId) => {
  await fs.mkdir('./server/tmp', { recursive: true }, err => {
    if (err) throw err;
    console.log('create dir');
  });
  await fs.writeFile(`./server/tmp/${userId}.html`, parseHTML(html, userId), err => {
    if (err) throw err;
    console.log('The html has been saved!');
  });
  await fs.writeFile(`./server/tmp/${userId}.css`, css, err => {
    if (err) throw err;
    console.log('The css has been saved!');
  });
};

const createImage = async userId => {
  const args = ['-–no-sandbox', '-–disable-setuid-sandbox'];
  const browser = await puppeteer.launch({ args });
  const page = await browser.newPage();
  const retPath = `file://${path.join(process.cwd(), `server/tmp/${userId}.html`)}`;
  await page.goto(retPath);
  await page.setViewport({ width: 300, height: 300 });
  await page.screenshot({ path: `./server/tmp/${userId}.png` });
  await browser.close();
  return retPath;
};

module.exports = {
  createFiles,
  createImage,
};
