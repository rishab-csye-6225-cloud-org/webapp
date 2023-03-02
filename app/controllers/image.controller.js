const db = require("../models");
const { userModel, productModel, imageModel } = require("../models/index.js");
const bcrypt = require("bcrypt")
const User = userModel;
const Product = productModel;
const Image = imageModel;
const s3 = require("../utils/s3.util");
const product = require("../models/product");

const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)


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
    console.log("in upload image controller");

    try {

        if(request.file===undefined)
        {
            return response.status(400).json({
                message: 'File is not uploaded. Please upload one!'
            })
        }

        //const fileType = request.file.mimetype.split('/').pop();


        // if(fileType!=='jpeg' && fileType!=='png')
        // {
        //     return response.status(400).json({
        //         message: 'Given file type not supported!'
        //     })
        // }

        const file = request.file;

        if(!file.mimetype.includes("image/"))
        {
            return response.status(400).json({
                         message: 'Given file type not supported!'
                })
        }


        const result = await s3.uploadFile(request.file, request.user.id);

        //unlink from uploads
        await unlinkAsync(request.file.path);

        console.log(result);

        if (result) {
            const image = Image.build({
                //s3_bucket_path: result.Location,
                s3_bucket_path: result.Key,
                product_id: request.params.id,
                file_name: request.file.originalname,
                date_created: new Date()
            });

            const imageRes = await image.save();

            const imageData = {
                image_id: imageRes.image_id,
                product_id: imageRes.product_id,
                file_name: imageRes.file_name,
                date_created: imageRes.date_created,
                s3_bucket_path: imageRes.s3_bucket_path
            }

            setSuccessResponse(imageData, response, 201);
        }

    } catch (error) {
        setErrorResponse(error, response, 400);
    }

}



exports.deleteImageById = async (request, response) => {

    try {
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

        // Check if image exists in s3        
        //const exists = await s3.fileExistsS3(image.s3_bucket_path);
        // if (!exists) {
        //     return response.status(404).json({
        //         message: 'Image not found! Please try with a different id',
        //     });
        // }

        if (image) {
            //trying to get the url last three 
            //const lastThreeSegments = image.s3_bucket_path.split('/').slice(-3).join('/');

            const result = await s3.deleteFile(image.s3_bucket_path);

            if (result) {
                const imageValue = await Image.destroy({
                    where: { image_id: id }
                });

                setSuccessResponse(imageValue, response, 204);
            }
        }
    } catch (error) {

        setErrorResponse(error, response, 400);
    }

}

//get image based on the image id (single image will be retrieved)
exports.getImageById = async (request, response) => {
    try {

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

        // const exists = await s3.fileExistsS3(imageVal.s3_bucket_path);

        // if (!exists) {
        //     return response.status(404).json({
        //         message: 'Image not found! Please try with a different id',
        //     });
        // }
        }
      
        const imageValue = await Image.findOne({
            where: { image_id: id }
        })

        setSuccessResponse(imageValue, response, 200);


    } catch (error) {

        return response.status(400).json({
            message: 'Please enter the id in number/integer format in the url'
        })

    }
}

//get all images for that particular product based on product id given in the request
exports.getAllImages = async (request, response) => {

    try {

        const id = request.params.id;

        if (parseInt(id)) {
            const imageVal = await Image.findOne({
                where: { product_id: id }
            })

            // if (!imageVal) {
            //     return response.status(404).json({
            //         message: 'Image not found! Please try with a different id'
            //     })
            // }
        }

        const imageValue = await Image.findAll({
            where: { product_id: id }
        })

        setSuccessResponse(imageValue, response, 200);


    } catch (error) {

        return response.status(400).json({
            message: 'Please enter the id in number/integer format in the url'
        })

    }
}