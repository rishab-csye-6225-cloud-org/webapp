const { userModel } = require("../models/index.js");
const bcrypt = require("bcrypt");
const User = userModel;

const logger = require("../utils/logger.js");

const Auth = async (req, res, next) => {
    
    // validate authorization header is present
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        logger.error(" Authorization header missing");
        return res.status(401).json({
            message: 'Authorization header is missing'
        })
    }

    // validate authentication credentials
    logger.info("Validating credentials...");
    const base64 = req.headers.authorization.split(' ')[1];
    const credential = Buffer.from(base64, 'base64').toString('ascii');
    const [email, password] = credential.split(':');

    //if after split one of the fields if empty then throw error
    if(email=="" || password=="")
    {
        logger.error(" Email/password problem");
        return res.status(401).json({
            message: 'Email or password is missing/empty!'
        })

    }

    
    const user = await User.findOne({ 
        where: { username: email } 
    });

    req.user = user;

    if (!user) {
        logger.error("Unauthorized access");
        return res.status(401).json({
            message: 'Unauthorized access - Invalid username or password' 
        })
    }
    
    // verify password
    const isPasswordMatch = bcrypt.compareSync(password, user.password)
    if (!isPasswordMatch) {
        logger.error("Unauthorized access");
        return res.status(401).json({
            message: 'Unauthorized access - Invalid username or password'
        })
    }

    // validate if user is trying to access his personal account
    if (req.params.id){
        logger.error("Forbidden access!");
        if (user.id !== parseInt(req.params.id)) {
            return res.status(403).json({
                message: 'Forbidden Resource!!'
            })
        }
    }
    logger.info("Validation completed successfully!");
    //success and the other call to the next callback function
    next();

}

module.exports = Auth;