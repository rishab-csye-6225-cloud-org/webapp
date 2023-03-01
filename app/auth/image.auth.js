const { productModel, userModel, imageModel } = require("../models/index.js");
const bcrypt = require("bcrypt");
const product = require("../models/product.js");
const Product = productModel;
const User = userModel;

//image
const image= require("../models/image.js");
const Image = imageModel;


const imageAuth = async (req, res, next) => {

    //code for image authentication
    try{
        if(parseInt(req.params.image_id))
        {
            const imageVal = await Image.findOne({
                where: { image_id: req.params.image_id }
            })
    
    
            if(imageVal)
            {
                if (imageVal.product_id != req.params.id) {
                    return res.status(403).json({
                        message: 'Forbidden request'
                    })
                }
            }
        }else{
            return res.status(400).json({
                message: 'Please enter the id in number/integer format in the url'
            })
        }
    }catch (err) {
        return res.status(400).json({
            message: 'Please enter the id in number/integer format in the url'
        })
    }
    

    //success and the other call to the next callback function
    next();

}

module.exports = imageAuth;