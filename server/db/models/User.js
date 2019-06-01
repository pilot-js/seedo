const conn = require('../conn');
const { Sequelize } = conn;

module.exports = conn.define('user', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
      notEmpty: false,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false,
    },
  },
  githubId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});
