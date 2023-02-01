const config = require("./app/config/config.js");
const express = require("express");

const bodyParser = require("body-parser");

const cors  = require("cors");

const app = express();
const routes = require('./app/routes/user.routes.js');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));



app.use("/v1" , routes);

app.get("/" ,  (req,res)=>{
    res.json({
        message: "welcome to my application"
    })
});

app.get("/healthz" , (req,res) =>{
    try{
        return res.status(200).send();
    }catch(err){
        return res.status(400).json(err); 
    }
    
})

module.exports = app;