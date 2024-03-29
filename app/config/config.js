require('dotenv').config()
module.exports = {

HOST: process.env.DB_HOSTNAME ,
USER: process.env.DB_USER ,
PASSWORD: process.env.DB_PASSWORD,
DB: process.env.DB_NAME,
DIALECT:"postgres",
PORT : process.env.DB_PORT ,
APP_PORT : process.env.APP_PORT, 

pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 20000
},
dialectOptions: {
    useUTC: false, 
    dateStrings: true,
    typeCast: true
},
timezone: '-05:00'
}