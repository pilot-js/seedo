const fs = require('fs');
//const puppeteer = require('puppeteer');
const path = require('path');
const axios = require('axios');
try {
  Object.assign(process.env, require('./.env'));
} catch (error) {
  console.log('Could not find .env file.');
}

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

const createImage = async (html, css, userId, challengeId, width, height) => {
  const response = await axios.post(`${process.env.API}/create-image`, {
    html,
    css,
    userId,
    challengeId,
    width,
    height,
  });
  return response.data;
};

const seedImage = async (html, css, userId, challengeId) => {
  const response = await axios.post(`${process.env.API}/seed-image`, {
    html,
    css,
    userId,
    challengeId,
  });
  return response.data;
};

// /******  PREVIEW ******/

const createImagePreview = async (html, css, challengeId, userId, width, height) => {
  try {
    const response = await axios.post(`${process.env.API}/create-image`, {
      html,
      css,
      userId,
      challengeId,
      width,
      height,
    });
    return response.data;
  } catch (err) {
    console.log('error from createImagePreview: ', err);
  }
};

module.exports = {
  createFiles,
  createImage,
  createImagePreview,
  seedImage,
};
