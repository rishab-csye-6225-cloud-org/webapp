const { productModel, userModel, imageModel } = require("../models/index.js");
const bcrypt = require("bcrypt");
const product = require("../models/product.js");
const Product = productModel;
const User = userModel;

//image
const image= require("../models/image.js");
const Image = imageModel;

const productAuth = async (req, res, next) => {

    // validate authorization header is present
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({
            message: 'Authorization header is missing'
        })
    }

    // validate authentication credentials
    const base64 = req.headers.authorization.split(' ')[1];
    const credential = Buffer.from(base64, 'base64').toString('ascii');
    const [email, password] = credential.split(':');

    //if after split one of the fields if empty then throw error
    if (email == "" || password == "") {

        return res.status(401).json({
            message: 'Email or password is missing/empty!'
        })

    }


    const user = await User.findOne({
        where: { username: email }
    });

    req.user = user;

    if (!user) {
        return res.status(401).json({
            message: 'Unauthorized access - Invalid username or password'
        })
    }

    // verify password
    const isPasswordMatch = bcrypt.compareSync(password, user.password)
    if (!isPasswordMatch) {
        return res.status(401).json({
            message: 'Unauthorized access - Invalid username or password'
        })
    }


    try {

        if (parseInt(req.params.id)) {
            const productVal = await Product.findOne({
                where: { id: req.params.id }
            })

            if (productVal) {

                if (productVal.owner_user_id != user.id) {
                    return res.status(403).json({
                        message: 'Forbidden request as user is trying to access a resource which he did not create it'
                    })
                }
            } else {
                return res.status(404).json({
                    message: 'Product not found! Please try with a different product id'
                })
            }

        }else{
        return res.status(400).json({
            message: 'Please enter the id in number/integer format in the url'
        })
    }
    } catch (err) {
        return res.status(400).json({
            message: 'Please enter the id in number/integer format in the url'
        })
    }

    //code for image authentication
    // try{
    //     if(parseInt(req.params.image_id))
    //     {
    //         const imageVal = await Image.findOne({
    //             where: { image_id: req.params.image_id }
    //         })
    
    
    //         if(imageVal)
    //         {
    //             if (imageVal.product_id != req.params.id) {
    //                 return res.status(403).json({
    //                     message: 'Forbidden request'
    //                 })
    //             }
    //         }
    //     }else{
    //         return res.status(400).json({
    //             message: 'Please enter the id in number/integer format in the url'
    //         })
    //     }
    // }catch (err) {
    //     return res.status(400).json({
    //         message: 'Please enter the id in number/integer format in the url'
    //     })
    // }
    

    //success and the other call to the next callback function
    next();

}

module.exports = productAuth;