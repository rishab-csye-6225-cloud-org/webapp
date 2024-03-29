const db = require("../models");
const { userModel,productModel } = require("../models/index.js");
const bcrypt = require("bcrypt")
const logger = require("../utils/logger.js");
const User = userModel;

//statsd client import
// var StatsD = require('node-statsd'),
//       client = new StatsD({host: 'localhost', port: 8125});
// var StatsD = require('node-statsd'),
//       client = new StatsD();

// var Client = require('node-statsd');
// const client = new Client("localhost", 8125);

const client = require("../utils/statsd.js");

const Product = productModel;

const Op = db.Sequelize.Op;

const setErrorResponse = (error, response, status) => {
    response.status(status);
    response.json(error);
}


const setSuccessResponse = (obj, response, status) => {
    response.status(status);
    response.json(obj);
}


exports.create = async (request, response) => {


    try {

        logger.info("Post request for user: v1/user");
        client.increment('post.user.create');
        if ("username" in request.body) {
           
            if (request.body.username === "") {
                logger.error("username was empty");
                return setErrorResponse(
                    { message: 'You cannot keep username field empty!!' }, response, 400);
            }
        }


        if ("first_name" in request.body) {

            if (request.body.first_name === "") {
                logger.error("first_name was empty");
                return setErrorResponse(
                    { message: 'You cannot keep first_name field empty!!' }, response, 400);

            }

        }

        if ("last_name" in request.body) {

            if (request.body.last_name === "") {
                logger.error("last_name was empty");
                return setErrorResponse(
                    { message: 'You cannot keep last_name field empty!!' }, response, 400);

            }

        }

        if ("password" in request.body) {

            if (request.body.password === "") {
                logger.error("password was empty");
                return setErrorResponse(
                    { message: 'You cannot keep password field empty!!' }, response, 400);

            }

        }



        const emailValidation =
            /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/
        if (!emailValidation.test(request.body.username)) {
            logger.error("Invalid email id for user");
            return setErrorResponse({ message: 'Enter your Email ID in correct format. Example: something@xyz.com' },
                response, 400);

        }


        if (request.body.id) {
            logger.error("Invalid request");
            return setErrorResponse({ message: 'Invalid request for user object: ID should not be provided' },
                response, 400);
        }



        if (!request.body.username || !request.body.password || !request.body.first_name ||
            !request.body.last_name
        ) {
            logger.error("Required fields are not present in the request body");
            return setErrorResponse({ message: 'username, password, first_name, and last_name are required fields' }, response, 400)

        }


        if (request.body.password.length < 5 || request.body.password.length > 15) {
            logger.error("Password length problem");
            return setErrorResponse({ message: 'Password length should be between 5 and 15' }, response, 400);

        }

        const getUser = await User.findOne({
            where: {
                username: request.body.username,
            },
        }).catch((err) => {
            
            return setErrorResponse({
                message: err.message || 'Some error occurred while creating the user',
            }, response, 400)
        })
        if (getUser) {
            logger.error("username already present");
            return setErrorResponse({ message: 'User with same username/email already present!! Please enter different email address' }, response, 400)
        } else {

            //hashing the password
            logger.info("Bcrypting the password");
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(request.body.password, salt)

            // this saves the user instance just in the memory but not db
            logger.info("user object build success");
            const user = User.build({
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                password: hashedPassword,
                username: request.body.username

            })

            // here the save() saves the the user instance in the database
            logger.info("user saved in the database");
            const userRes = await user.save();

            //handeled no password return in response when user is created
            const userData = {
                id: userRes.id,
                first_name: userRes.first_name,
                last_name: userRes.last_name,
                username: userRes.username,
                account_created: userRes.account_created,
                account_updated: userRes.account_updated
            }
            logger.info("User created successfully");
            setSuccessResponse(userData, response, 201);

        }
    }

    //validation e
    catch (error) {
        logger.error("Invalid request body");
        setErrorResponse(error, response, 400);
    }

}


exports.getById = async (req, res) => {

    try {

        logger.info("Get request for user: v1/user");

        client.increment('get.user.fetch.id');
        const id = req.params.id;
        const value = await User.findOne({
            where: { id },
            attributes: {
                exclude: ['password']
            }
        })

        logger.info("User fetched successfully!");
        setSuccessResponse(value, res, 200);


    } catch (error) {
        logger.error("Invalid request body");
        setErrorResponse(error, res, 401);
    }

}

exports.updateById = async (req, res) => {
    try {

        logger.info("Put request for user: v1/user/:id");

        client.increment('put.user.update');
        const id = req.params.id;


        //validation s

        // req.body is empty
        if (!req.body) {
            logger.error("request body for user is empty");
            return setErrorResponse(
                {
                    message: "Request body can't empty",
                },
                res, 400
            );
        }

        if (req.body.id) {
            logger.error("invalid body for user");
            return setErrorResponse({ message: 'Invalid body ID should not be provided' },
                res, 400);
        }
        //new validation start

        if ("username" in req.body) {

            if (req.body.username === "") {
                logger.error("username is empty");
                return setErrorResponse(
                    { message: 'You cannot keep username field empty!!' }, res, 400);

            }

        }

        //new validation end

        if ("first_name" in req.body) {

            if (req.body.first_name === "") {
                logger.error("first_name is empty");
                return setErrorResponse(
                    { message: 'You cannot keep first_name field empty!!' }, res, 400);

            }

        }


        if ("last_name" in req.body) {

            if (req.body.last_name === "") {
                logger.error("last_name is empty");
                return setErrorResponse(
                    { message: 'You cannot keep last_name field empty!!' }, res, 400);

            }

        }

        if ("password" in req.body) {

            if (req.body.password === "") {
                logger.error("password is empty");
                return setErrorResponse(
                    { message: 'You cannot keep password field empty!!' }, res, 400);

            }

        }

        if (!req.body.username || !req.body.password || !req.body.first_name ||
            !req.body.last_name
        ) {
            logger.error("Required fields are not entered for user");
            return setErrorResponse({ message: 'username, password, first_name, and last_name are required fields' }, res, 400)

        }


        //
        if (req.user.username != req.body.username) {
            logger.error("Username is wrong");
            return setErrorResponse(
                {
                    message: "Something wrong with the username entered, Please enter a correct username",

                },
                res, 400
            );
        }


        if ("account_created" in req.body || "account_updated" in req.body) {
            logger.error("Request body invalid");
            return setErrorResponse(
                { message: ' Request body cannot contain account_created or account_updated field' }, res, 400);

        }

        if (req.body.account_created || req.body.account_updated) {
            logger.error("Request body invalid");
            return setErrorResponse(
                {
                    message: "Request should not contain any one of the following : account_created and account_updated",

                },
                res, 400
            );

        }

        if (
            !req.body.first_name &&
            !req.body.last_name &&
            !req.body.password && !req.body.username //
        ) {
            logger.error("Request body invalid");
            return setErrorResponse(
                {
                    message: "Request body does not include any one of the following : first_name, last_name, password, username",
                },
                res, 400
            );
        }

        if (req.body.password) {
            if (req.body.password.length < 5 || req.body.password.length > 15) {
                logger.error("Password length invalid");
                return setErrorResponse({ message: 'Password length should be between 5 and 15' }, res, 400);

            }
        }

        var userObj = await User.findByPk(id);


        // check if id is present in the request body and if it matches the id in the request
        if (req.body.id) {
            if (userObj.id !== req.body.id) {
                logger.error("User id cannot be updated");
                return setErrorResponse(
                    { message: "User Id cannot be updated", },
                    res, 400
                );
            }
        }

        // check if account_created is present in the request body
        if (req.body.account_created) {
            logger.error("account_created cannot be updated");
            return setErrorResponse(
                { message: "account_created cannot be updated", },
                res, 400
            );
        }

        // check if account_updated is present in the request body
        if (req.body.account_updated) {
            logger.error("account_updated cannot be updated");
            return setErrorResponse(
                { message: "account_updated cannot be updated", },
                res, 400
            );
        }
        //validation e


        //need to add a check here if password is not provided for update //validate

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            var updateHashedPassword = await bcrypt.hash(req.body.password, salt)

        }

        const userUpdate = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: updateHashedPassword != "" ? updateHashedPassword : req.body.password,

        }


        const val = await User.update(userUpdate, {
            where: { id: id }
        })

        if (!val) {
            return setErrorResponse(
                {
                    message: "Cannot update the user",
                },
                res, 400
            );
        }
        logger.info("User updated successfully!");
        setSuccessResponse(val, res, 204);

    } catch (error) {
        logger.error("Invalid request body");
        setErrorResponse(error, res, 400);
    }
}




















