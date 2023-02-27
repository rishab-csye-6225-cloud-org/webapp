const config = require("../config/config.js");

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

//adding new table
db.productModel = require("./product")(sequelize, Sequelize);
db.productModel.belongsTo(db.userModel, {foreignKey: 'owner_user_id'});

db.imageModel = require("./image")(sequelize,Sequelize);

module.exports = db;