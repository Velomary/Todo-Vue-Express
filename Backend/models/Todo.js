const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Connexion à ta base de données

const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Todo;
