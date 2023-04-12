const config = require("./app/config/config.js");
const express = require("express");

const bodyParser = require("body-parser");

const cors  = require("cors");
const logger = require("./app/utils/logger.js");
const app = express();
const userRoutes = require('./app/routes/user.routes.js');
const client = require("./app/utils/statsd.js");
const productRoutes = require('./app/routes/product.routes.js');

const imageRoutes = require('./app/routes/image.routes.js');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use("/v1" , productRoutes);

app.use("/v1" , userRoutes);

app.use("/v1" , imageRoutes);


app.get("/" ,  (req,res)=>{
    res.json({
        message: "welcome to my application"
    })
});

app.get("/healthz" , (req,res) =>{
    try{
        client.increment('get.healthz');
        logger.info("Requested healthz point : /healthz");
        return res.status(200).send();
    }catch(err){
        logger.error("Something went wrong -> healthz point : /healthz");
        return res.status(400).json(err);
    }
    
})

//cicd test
app.get("/cicd" , (req,res) =>{
    try{
        client.increment('get.cicd');
        logger.info("Requested cicd point : /cicd");
        return res.status(200).send();
    }catch(err){
        logger.error("Something went wrong -> cicd point : /cicd");
        return res.status(400).json(err);
    }
    
})


module.exports = app;