const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('user', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
  },
});
