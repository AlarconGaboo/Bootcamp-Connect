const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importación de modelos
db.User = require('./user.model')(sequelize, Sequelize);
db.Bootcamp = require('./bootcamp.model')(sequelize, Sequelize);

// Definición de relaciones entre modelos
db.User.belongsToMany(db.Bootcamp, {
  through: "user_bootcamp",
  as: "bootcamps",
  foreignKey: "user_id"
});
db.Bootcamp.belongsToMany(db.User, {
  through: "user_bootcamp",
  as: "users",
  foreignKey: "bootcamp_id"
});

module.exports = db;
