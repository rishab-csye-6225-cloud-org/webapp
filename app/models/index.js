const config = require("../config/config.js");
//require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    port: config.PORT,
    dialect: config.DIALECT,
    operatorAliases: false,

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userModel = require("./user")(sequelize, Sequelize);

module.exports = db;