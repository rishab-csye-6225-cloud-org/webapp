const app = require('./app.js');
const config = require("./app/config/config.js");

const db = require("./app/models");

const logger = require("./app/utils/logger.js");

db.sequelize.query("CREATE SCHEMA IF NOT EXISTS public;").then();

//here this will help in sync the db wherein if any changes to model is made this would encorporate 
//the changes without even dropping the entire table and rebuild again
db.sequelize.sync({alter:true});

const PORT = config.APP_PORT || 9001 ;

logger.info("server is running on port :" + PORT);

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}` );
})
