const db = require("../models");
const { userModel, productModel } = require("../models/index.js");

const bcrypt = require("bcrypt")

const User = userModel;
const Product = productModel;
//const Op = db.Sequelize.Op;

const setErrorResponse = (error, response, status) => {
    response.status(status);
    response.json(error);
}


const setSuccessResponse = (obj, response, status) => {
    response.status(status);
    response.json(obj);
}

//product requests
exports.createProduct = async (request, response) => {


    try {
        console.log("in product controller");
        //validation s
        if ("name" in request.body) {

            if (request.body.name === "") {
                return setErrorResponse(
                    { message: 'You cannot keep product name field empty!!' }, response, 400);

            }
        }

        if ("description" in request.body) {

            if (request.body.description === "") {
                return setErrorResponse(
                    { message: 'You cannot keep description field empty!!' }, response, 400);

            }

        }

        if ("sku" in request.body) {

            if (request.body.sku === "") {
                return setErrorResponse(
                    { message: 'You cannot keep sku field empty!!' }, response, 400);

            }

        }

        if ("manufacturer" in request.body) {

            if (request.body.manufacturer === "") {
                return setErrorResponse(
                    { message: 'You cannot keep manufacturer field empty!!' }, response, 400);

            }

        }

        if ("quantity" in request.body) {

            if (request.body.quantity === "") {
                return setErrorResponse(
                    { message: 'You cannot keep quantity field empty!!' }, response, 400);

            }

        }

        if (request.body.id || request.body.owner_user_id) {

            return setErrorResponse(
                {
                    message: "Request should not contain any one of the following : id, and owner_user_id",

                },
                response, 400
            );

        }



        if(Number.isInteger(request.body.name) || Number.isInteger(request.body.description) ||
        Number.isInteger(request.body.sku) || Number.isInteger(request.body.manufacturer)){
            return setErrorResponse(
                { message: 'You must enter name, description, sku, and manufacturer in string format' }, response, 400);
        }


        if(request.body.quantity){
            if (typeof (request.body.quantity) == 'string'   ||  !Number.isInteger(request.body.quantity)) {
                return setErrorResponse(
                    { message: 'You must enter the quantity of type number' }, response, 400);
            }

        }
       

        //quantity's validation for range
        if (request.body.quantity < 0 || request.body.quantity > 100) {
            return setErrorResponse(
                { message: 'You must enter the quantity between 0 and 100' }, response, 400);
        }

        

        if (!request.body.name || !request.body.description || !request.body.sku || !request.body.manufacturer || request.body.quantity==undefined) {

            return setErrorResponse({ message: 'name, description, sku, manufacturer and quantity are required fields' }, response, 400)

        }
    
        //validation for sku duplicate should not be allowed
        const getProduct = await Product.findOne({
            where: {
                sku: request.body.sku,
            },
        }).catch((err) => {
            return setErrorResponse({
                message: err.message || 'Some error occurred while accessing the data',
            }, response, 400)
        })
        if (getProduct) {
            return setErrorResponse({ message: 'Product with same sku already exist. Please enter a different id' }, response, 400)
        }

        const ownerIdOfProduct = request.user.id;


        const product = Product.build({
            name: request.body.name,
            description: request.body.description,
            sku: request.body.sku,
            manufacturer: request.body.manufacturer,
            quantity: request.body.quantity,
            owner_user_id: ownerIdOfProduct

        })

        const productRes = await product.save();

        const productData = {
            id: productRes.id,
            name: productRes.name,
            description: productRes.description,
            sku: productRes.sku,
            manufacturer: productRes.manufacturer,
            quantity: productRes.quantity,
            date_added: productRes.date_added,
            date_last_updated: productRes.date_last_updated,
            owner_user_id: productRes.owner_user_id
        }

        setSuccessResponse(productData, response, 201);

    }

    catch (error) {

       setErrorResponse(error, response, 400);
    }

}




exports.getProductById = async (req, res) => {

    try {

        const id = req.params.id;

        //404 NOT FOUND IF BAD ID   
        if (parseInt(id)) {
            const productVal = await Product.findOne({
                where: { id: id }
            })

            if (!productVal) {
                return res.status(404).json({
                    message: 'Product not found! Please try with a different product id'
                })
            }
        }
        //

        const productValue = await Product.findOne({
            where: { id }
        })

        setSuccessResponse(productValue, res, 200);


    } catch (error) {

        return res.status(400).json({
            message: 'Please enter the id in number/integer format in the url'
        })
       
    }

}


exports.deleteById = async (req, res) => {

    try {

        const id = req.params.id;


        const productValue = await Product.destroy({
            where: { id }
        });

        setSuccessResponse(productValue, res, 204);


    } catch (error) {

        setErrorResponse(error, res, 400);
    }

}


//update
exports.updateProductById = async (request, response) => {

    try {

        const id = request.params.id;

        //validation
        if ("name" in request.body) {

            if (request.body.name === "") {
                return setErrorResponse(
                    { message: 'You cannot keep product name field empty!!' }, response, 400);
            }
        }

        if ("description" in request.body) {
            if (request.body.description === "") {
                return setErrorResponse(
                    { message: 'You cannot keep description field empty!!' }, response, 400);
            }
        }

        if ("sku" in request.body) {
            if (request.body.sku === "") {
                return setErrorResponse(
                    { message: 'You cannot keep sku field empty!!' }, response, 400);
            }
        }

        if ("manufacturer" in request.body) {
            if (request.body.manufacturer === "") {
                return setErrorResponse(
                    { message: 'You cannot keep manufacturer field empty!!' }, response, 400);
            }
        }

        if ("quantity" in request.body) {
            if (request.body.quantity === "") {
                return setErrorResponse(
                    { message: 'You cannot keep quantity field empty!!' }, response, 400);

            }
        }


        if (!request.body.name || !request.body.description || !request.body.sku ||
            !request.body.manufacturer || request.body.quantity==undefined
        ) {
            return setErrorResponse({ message: 'name, description, sku, manufacturer and quantity are required fields' }, response, 400)
        }

        //rishab
        if(Number.isInteger(request.body.name) || Number.isInteger(request.body.description) ||
        Number.isInteger(request.body.sku) || Number.isInteger(request.body.manufacturer)){
            return setErrorResponse(
                { message: 'You must enter name, description, sku, and manufacturer in string format' }, response, 400);
        }



        if(request.body.quantity){
            if (typeof (request.body.quantity) == 'string'   ||  !Number.isInteger(request.body.quantity)) {
                return setErrorResponse(
                    { message: 'You must enter the quantity of type number' }, response, 400);
            }

        }


        //quantity's validation for range
        if (request.body.quantity < 0 || request.body.quantity > 100) {
            return setErrorResponse(
                { message: 'You must enter the quantity between 0 and 100' }, response, 400);
        }

        //validation for sku duplicate should not be allowed
        const getProduct = await Product.findOne({
            where: {
                sku: request.body.sku,
            },
        })

        if (getProduct != null) {
            if (getProduct.id != request.params.id) {
                return setErrorResponse({ message: 'Product with same sku already exist. Please enter a different id' }, response, 400)
            }
        }


        if (request.body.id || request.body.owner_user_id) {

            return setErrorResponse(
                {
                    message: "Request should not contain any one of the following : id, and owner_user_id",

                },
                response, 400
            );

        }

        //end 
        const productUpdate = {
            name: request.body.name,
            description: request.body.description,
            sku: request.body.sku,
            manufacturer: request.body.manufacturer,
            quantity: request.body.quantity

        }

        const val = await Product.update(productUpdate, {
            where: { id: id }
        })

        if (!val) {
            return setErrorResponse(
                {
                    message: "Cannot update the product",
                },
                response, 400
            );
        }
        return setSuccessResponse(val, response, 204);
    } catch (error) {
        setErrorResponse(error, response, 400);
    }
}


//Patch
exports.patchProductById = async (request, response) => {

    try {
        const id = request.params.id;

        //validation
        if ("name" in request.body) {
            if (request.body.name === "") {
                return setErrorResponse(
                    { message: 'You cannot keep product name field empty!!' }, response, 400);
            }
        }

        if ("description" in request.body) {
            if (request.body.description === "") {
                return setErrorResponse(
                    { message: 'You cannot keep description field empty!!' }, response, 400);
            }
        }

        if ("sku" in request.body) {
            if (request.body.sku === "") {
                return setErrorResponse(
                    { message: 'You cannot keep sku field empty!!' }, response, 400);
            }
        }

        if ("manufacturer" in request.body) {
            if (request.body.manufacturer === "") {
                return setErrorResponse(
                    { message: 'You cannot keep manufacturer field empty!!' }, response, 400);
            }
        }

        if ("quantity" in request.body) {

            if (request.body.quantity === "") {
                return setErrorResponse(
                    { message: 'You cannot keep quantity field empty!!' }, response, 400);

            }

        }


        if (request.body.id || request.body.owner_user_id) {
            return setErrorResponse(
                { message: 'You cannot add id and owner_user_id as fields!! Only fields : name, description, manufacturer, sku and quantity can be updated' }, response, 400);
        }


        if(request.body.name === null || request.body.manufacturer === null || request.body.description === null 
            || request.body.sku === null || request.body.quantity === null)
        {
            return setErrorResponse(
                { message: 'You cannot enter null for these fields : name, description, sku, quantity and manufacturer' }, response, 400);
        }

        
        if(Number.isInteger(request.body.name) || Number.isInteger(request.body.description) ||
        Number.isInteger(request.body.sku) || Number.isInteger(request.body.manufacturer)){
            return setErrorResponse(
                { message: 'You must enter name, description, sku, and manufacturer in string format' }, response, 400);
        }




        if(request.body.quantity){
            if (typeof (request.body.quantity) == 'string'   ||  !Number.isInteger(request.body.quantity)) {
                return setErrorResponse(
                    { message: 'You must enter the quantity of type number' }, response, 400);
            }

        }


       // quantity's validation for range
        if (request.body.quantity < 0 || request.body.quantity > 100) {
            return setErrorResponse(
                { message: 'You must enter the quantity between 0 and 100' }, response, 400);
        }

        //validation for sku duplicate should not be allowed
        if (request.body.sku) {
            const getProduct = await Product.findOne({
                where: {
                    sku: request.body.sku,
                },
            })

            if (getProduct != null) {
                if (getProduct.id != request.params.id) {
                    return setErrorResponse({ message: 'Product with same sku already exist. Please enter a different id' }, response, 400)
                }
            }
        }

        //end 
        const productUpdate = {
            name: request.body.name,
            description: request.body.description,
            sku: request.body.sku,
            manufacturer: request.body.manufacturer,
            quantity: request.body.quantity

        }

        const val = await Product.update(productUpdate, {
            where: { id: id }
        })

        if (!val) {
            return setErrorResponse(
                {
                    message: "Cannot update the product",
                },
                response, 400
            );
        }

        return setSuccessResponse(val, response, 204);


    } catch (error) {
       
        setErrorResponse(error, response, 400);
    }

}