const config = require("./app/config/config.js");
const express = require("express");

const bodyParser = require("body-parser");

const cors  = require("cors");

const app = express();
const userRoutes = require('./app/routes/user.routes.js');

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
        return res.status(200).send();
    }catch(err){
        return res.status(400).json(err); 
    }
    
})

module.exports = app;