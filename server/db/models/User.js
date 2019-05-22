const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('user', {
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});
