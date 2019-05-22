const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('user', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
      notEmpty: false,
    },
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false,
    },
  },
});
