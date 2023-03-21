const db = require("../models");
const { userModel, productModel, imageModel } = require("../models/index.js");
const bcrypt = require("bcrypt")
const User = userModel;
const Product = productModel;
const Image = imageModel;
const s3 = require("../utils/s3.util");
const product = require("../models/product");
const logger = require("../utils/logger.js");
const fs = require('fs')
const { promisify } = require('util')
const client = require("../utils/statsd.js");
const unlinkAsync = promisify(fs.unlink)
const client = require("../utils/statsd.js");

const setErrorResponse = (error, response, status) => {
    response.status(status);
    response.json(error);
}


const setSuccessResponse = (obj, response, status) => {
    response.status(status);
    response.json(obj);
}

exports.uploadImage = async (request, response) => {

    console.log(request.file)
    logger.info("Image file which is to be uploaded : " + request.file);
    client.increment('post.image.upload');
    try {
        logger.info("Upload request for image: v1/product/:id/image");

        if(request.file===undefined)
        {
            logger.error("No file selected to upload");
            return response.status(400).json({
                message: 'File is not uploaded. Please upload one!'
            })
        }

        const file = request.file;

        if(!file.mimetype.includes("image/"))
        {
            logger.error("File format selected is not supported");
            return response.status(400).json({
                         message: 'Given file type not supported!'
                })
        }

        logger.info("Uploading file to S3!");
        const result = await s3.uploadFile(request.file, request.user.id);

        //unlink from uploads
        await unlinkAsync(request.file.path);

        console.log(result);

        if (result) {
            const image = Image.build({
                s3_bucket_path: result.Key,
                product_id: request.params.id,
                file_name: request.file.originalname,
                date_created: new Date()
            });

            logger.info("Image data saved to database");
            const imageRes = await image.save();

            const imageData = {
                image_id: imageRes.image_id,
                product_id: imageRes.product_id,
                file_name: imageRes.file_name,
                date_created: imageRes.date_created,
                s3_bucket_path: imageRes.s3_bucket_path
            }
            logger.info("Image uploaded successfully");

            setSuccessResponse(imageData, response, 201);
        }

    } catch (error) {
        logger.error("Something went wrong with the request");
        setErrorResponse(error, response, 400);
    }

}


exports.deleteImageById = async (request, response) => {

    try {
        logger.info("Delete request for image: v1/product/:id/image/:id");
        client.increment('delete.image.id');
        const id = request.params.image_id;

        const image = await Image.findOne({
            where: {
                image_id: request.params.image_id,
            },
        });

        if (!image) {

            return response.status(404).json({
                message: 'Image not found! Please try with a different image id'
            })
        }


        if (image) {
            const result = await s3.deleteFile(image.s3_bucket_path);

            if (result) {
                const imageValue = await Image.destroy({
                    where: { image_id: id }
                });
                logger.info("Image deleted successfully");
                setSuccessResponse(imageValue, response, 204);
            }
        }
    } catch (error) {
        logger.error("Something went wrong with the request");
        setErrorResponse(error, response, 400);
    }

}

//get image based on the image id (single image will be retrieved)
exports.getImageById = async (request, response) => {
    try {
        logger.info("Get request for image: v1/product/:id/image/:id");
        client.increment('get.image.fetch.id');
        const id = request.params.image_id;

        //404 NOT FOUND IF BAD ID   
        if (parseInt(id)) {
            const imageVal = await Image.findOne({
                where: { image_id: id }
            })

            if (!imageVal) {
                return response.status(404).json({
                    message: 'Image not found! Please try with a different image id'
                })
            }
        }
      
        const imageValue = await Image.findOne({
            where: { image_id: id }
        })
        logger.info("Image fetched successfully");

        setSuccessResponse(imageValue, response, 200);


    } catch (error) {
        logger.error("Something went wrong with the request");
        return response.status(400).json({
            message: 'Please enter the id in number/integer format in the url'
        })

    }
}

//get all images for that particular product based on product id given in the request
exports.getAllImages = async (request, response) => {

    try {
        logger.info("Get request for all images: v1/product/:id/image");
        client.increment('get.image.fetch.all');
        const id = request.params.id;

        if (parseInt(id)) {
            const imageVal = await Image.findOne({
                where: { product_id: id }
            })
        }

        const imageValue = await Image.findAll({
            where: { product_id: id }
        })
        logger.info("All Images fetched successfully");
        setSuccessResponse(imageValue, response, 200);


    } catch (error) {
        logger.error("Something went wrong with the request");

        return response.status(400).json({
            message: 'Please enter the id in number/integer format in the url'
        })

    }
}