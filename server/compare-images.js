/* eslint no-use-before-define: 1 */
/* eslint no-inner-declarations: 1 */
const axios = require('axios');
try {
  Object.assign(process.env, require('./.env')); // eslint-disable-line global-require
} catch (error) {
  console.log('Could not find .env file.'); // eslint-disable-line no-console
}

async function compareImages(userchallenge, challenge, width, height, userId) {
  const response = await axios.post(`${process.env.API}/compare-images`, {
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
