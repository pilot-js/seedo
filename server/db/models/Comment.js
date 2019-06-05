const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('comment', {
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
