const { Sequelize } = require('sequelize');

// Configuration de la connexion à MySQL
const sequelize = new Sequelize('Todos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
