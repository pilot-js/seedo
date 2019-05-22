const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('challenge', {
  // from associations: imageId
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.name,
  },
  difficulty: {
    type: Sequelize.RANGE(Sequelize.INTEGER),
  },
});
