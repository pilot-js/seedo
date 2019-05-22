const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('challenge', {
  // from associations: imageId
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  difficulty: {
    type: Sequelize.RANGE(Sequelize.INTEGER),
  },
});
