/* eslint no-use-before-define: 1 */
/* eslint no-inner-declarations: 1 */
const axios = require('axios');
const config = require('./.env');

// what do we need out of this function?
// just the percentage

async function compareImages(userchallenge, challenge, width, height, userId) {
  const response = await axios.post(`${config.API}/compare-images`, {
    userchallenge,
    challenge,
    width,
    height,
    userId,
  });
  return response.data;
}

module.exports = {
  compareImages,
};
