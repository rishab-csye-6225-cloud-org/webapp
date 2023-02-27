const multer = require('multer')
const S3 = require('aws-sdk/clients/s3')
require("dotenv/config")
const fs = require("fs");
const {
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');


// Now creating the S3 instance which will be used in uploading photo to s3 bucket.
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
})


// UPLOAD FILE TO S3*
function uploadFile(file, userId) {

  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: userId + '/' + uuidv4() + '/' + file.originalname,
  };

  return s3.upload(uploadParams).promise(); // this will upload file to S3

}


function deleteFile(filename) {
  const deleteParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
  };

  return s3.deleteObject(deleteParams).promise();
}

function fileExistsS3(filename) {
  const isExistParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
  };

  try {
    return s3.headObject(isExistParams).promise()
    console.log("File Found in S3")
  } catch (err) {
    console.log("File not Found ERROR : " + err.code)
  }

}

module.exports = { uploadFile, deleteFile, fileExistsS3 };




