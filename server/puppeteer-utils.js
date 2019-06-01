const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');

const createFiles = async (html, css, userId) => {
  await fs.mkdir('./server/tmp', { recursive: true }, err => {
    if (err) throw err;
    console.log('create dir');
  });
  await fs.writeFile(`./server/tmp/${userId}.html`, html, err => {
    if (err) throw err;
    console.log('The html has been saved!');
  });
  await fs.writeFile(`./server/tmp/${userId}.css`, css, err => {
    if (err) throw err;
    console.log('The css has been saved!');
  });
};

const createImage = async userId => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const retPath = `file://${path.join(process.cwd(), `server/tmp/${userId}.html`)}`;
  await page.goto(retPath);
  await page.setViewport({ width: 100, height: 100 });
  await page.screenshot({ path: `./server/tmp/${userId}.png` });
  await browser.close();
  return retPath;
};

module.exports = {
  createFiles,
  createImage,
};
