const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const User = sequelize.define("user", {
  name: DataTypes.TEXT,
  username: {
    type: DataTypes.TEXT,
    defaultValue: '',
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    defaultValue: '',
    allowNull: true,
  },
  password: {
    type: DataTypes.TEXT,
    defaultValue: '',
    allowNull: false,
  },
  createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
  updateAt: Sequelize.literal('CURRENT_TIMESTAMP'),
});

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

module.exports = User