const config = require("../config/config.js");

const Sequelize = require("sequelize");
const logger = require('../utils/logger.js');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    port: config.PORT,
    dialect: config.DIALECT,
    logging: (message)=>{ logger.info(message)},
    operatorAliases: false,

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userModel = require("./user")(sequelize, Sequelize);

//adding new table
db.productModel = require("./product")(sequelize, Sequelize);
db.productModel.belongsTo(db.userModel, {foreignKey: 'owner_user_id'});


//need to add association


db.imageModel = require("./image")(sequelize,Sequelize);

module.exports = db;