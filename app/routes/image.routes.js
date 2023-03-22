const { Router } = require("express");
const productAuth = require('../auth/product.auth.js')
const auth = require('../auth/auth.js')
const imageAuth = require('../auth/image.auth.js')

const imageController = require("../controllers/image.controller.js");

var router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: __dirname + "/uploads/"});

const statsDMiddleware = require("../utils/statsDMiddleware.js");



router.post("/product/:id/image" ,statsDMiddleware,productAuth,upload.single('file'),imageController.uploadImage);

router.delete("/product/:id/image/:image_id" ,statsDMiddleware,productAuth ,imageAuth, imageController.deleteImageById)

router.get("/product/:id/image/:image_id" ,statsDMiddleware,productAuth,imageAuth, imageController.getImageById);

router.get("/product/:id/image" ,statsDMiddleware,productAuth, imageController.getAllImages);


module.exports = router;
