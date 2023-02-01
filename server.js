const app = require('./app.js');
const config = require("./app/config/config.js");

const db = require("./app/models");

db.sequelize.sync();

const PORT = config.APP_PORT || 9001 ;


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}` );
})
