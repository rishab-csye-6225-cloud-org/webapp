const db = require("../models");
const { userModel } = require("../models/index.js");
const bcrypt = require("bcrypt")

const User = userModel;

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
        console.log("in controller");

        //validation s


        if ("username" in request.body) {

            if (request.body.username === "") {
                return setErrorResponse(
                    { message: 'You cannot keep username field empty!!' }, response, 400);

            }

        }


        if ("first_name" in request.body) {

            if (request.body.first_name === "") {
                return setErrorResponse(
                    { message: 'You cannot keep first_name field empty!!' }, response, 400);

            }

        }

        if ("last_name" in request.body) {

            if (request.body.last_name === "") {
                return setErrorResponse(
                    { message: 'You cannot keep last_name field empty!!' }, response, 400);

            }

        }

        if ("password" in request.body) {

            if (request.body.password === "") {
                return setErrorResponse(
                    { message: 'You cannot keep password field empty!!' }, response, 400);

            }

        }



        const emailValidation =
            /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/
        if (!emailValidation.test(request.body.username)) {

            return setErrorResponse({ message: 'Enter your Email ID in correct format. Example: something@xyz.com' },
                response, 400);

        }


        if (request.body.id) {

            return setErrorResponse({ message: 'Invalid request for user object: ID should not be provided' },
                response, 400);
        }



        if (!request.body.username || !request.body.password || !request.body.first_name ||
            !request.body.last_name
        ) {

            return setErrorResponse({ message: 'username, password, first_name, and last_name are required fields' }, response, 400)

        }


        if (request.body.password.length < 5 || request.body.password.length > 15) {
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
            return setErrorResponse({ message: 'User with same username/email already present!! Please enter different email address' }, response, 400)
        } else {

            //hashing the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(request.body.password, salt)

            // this saves the user instance just in the memory but not db
            const user = User.build({
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                password: hashedPassword,
                username: request.body.username

            })

            // here the save() saves the the user instance in the database
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

            setSuccessResponse(userData, response, 201);

        }
    }

    //validation e
    catch (error) {
        setErrorResponse(error, response, 400);
    }

}


exports.getById = async (req, res) => {

    try {

        const id = req.params.id;
        const value = await User.findOne({
            where: { id },
            attributes: {
                exclude: ['password']
            }
        })

        setSuccessResponse(value, res, 200);


    } catch (error) {

        setErrorResponse(error, res, 401);
    }

}

exports.updateById = async (req, res) => {
    try {

        const id = req.params.id;


        //validation s

        // req.body is empty
        if (!req.body) {
            return setErrorResponse(
                {
                    message: "Request body can't empty",
                },
                res, 400
            );
        }


        if (req.body.id) {

            return setErrorResponse({ message: 'Invalid body ID should not be provided' },
                res, 400);
        }


        //new validation start

        if ("username" in req.body) {

            if (req.body.username === "") {
                return setErrorResponse(
                    { message: 'You cannot keep username field empty!!' }, res, 400);

            }

        }



        //new validation end



        if ("first_name" in req.body) {

            if (req.body.first_name === "") {
                return setErrorResponse(
                    { message: 'You cannot keep first_name field empty!!' }, res, 400);

            }

        }


        if ("last_name" in req.body) {

            if (req.body.last_name === "") {
                return setErrorResponse(
                    { message: 'You cannot keep last_name field empty!!' }, res, 400);

            }

        }

        if ("password" in req.body) {

            if (req.body.password === "") {
                return setErrorResponse(
                    { message: 'You cannot keep password field empty!!' }, res, 400);

            }

        }

        if (!req.body.username || !req.body.password || !req.body.first_name ||
            !req.body.last_name
        ) {

            return setErrorResponse({ message: 'username, password, first_name, and last_name are required fields' }, res, 400)

        }


        //
        if (req.user.username != req.body.username) {
            return setErrorResponse(
                {
                    message: "Something wrong with the username entered, Please enter a correct username",

                },
                res, 400
            );
        }


        if ("account_created" in req.body || "account_updated" in req.body) {


            return setErrorResponse(
                { message: ' Request body cannot contain account_created or account_updated field' }, res, 400);

        }


        if (req.body.account_created || req.body.account_updated) {

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
            return setErrorResponse(
                {
                    message: "Request body does not include any one of the following : first_name, last_name, password, username",
                },
                res, 400
            );
        }


        if (req.body.password) {
            if (req.body.password.length < 5 || req.body.password.length > 15) {
                return setErrorResponse({ message: 'Password length should be between 5 and 15' }, res, 400);

            }
        }


        var userObj = await User.findByPk(id);


        // check if id is present in the request body and if it matches the id in the request
        if (req.body.id) {
            if (userObj.id !== req.body.id) {
                return setErrorResponse(
                    { message: "User Id cannot be updated", },
                    res, 400
                );
            }
        }

        // check if account_created is present in the request body
        if (req.body.account_created) {
            return setErrorResponse(
                { message: "account_created cannot be updated", },
                res, 400
            );
        }

        // check if account_updated is present in the request body
        if (req.body.account_updated) {
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

        setSuccessResponse(val, res, 204);

    } catch (error) {
        setErrorResponse(error, res, 400);
    }
}
















