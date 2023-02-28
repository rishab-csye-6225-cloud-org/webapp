const { Router } = require("express");
const productAuth = require('../auth/product.auth.js')
const auth = require('../auth/auth.js')
const imageAuth = require('../auth/image.auth.js')

const imageController = require("../controllers/image.controller.js");

var router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: __dirname + "/uploads/"});


router.post("/product/:id/image" ,productAuth,upload.single('file'),imageController.uploadImage);

router.delete("/product/:id/image/:image_id" ,productAuth ,imageAuth, imageController.deleteImageById)

router.get("/product/:id/image/:image_id" ,productAuth,imageAuth, imageController.getImageById);

router.get("/product/:id/image" ,productAuth, imageController.getAllImages);


module.exports = router;
