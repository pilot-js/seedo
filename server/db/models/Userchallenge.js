const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('userchallenge', {
  // from associations: userId, challengeId, imageId
  html: {
    type: Sequelize.TEXT,
  },
  css: {
    type: Sequelize.TEXT,
  },
  js: {
    type: Sequelize.TEXT,
  },
  submitted: {
    type: Sequelize.BOOLEAN,
  },
  grade: {
    type: Sequelize.INTEGER,
  },
  // TODO use Image model instead ?
  // image: {
  //   type: Sequelize.STRING,
  // },
});
