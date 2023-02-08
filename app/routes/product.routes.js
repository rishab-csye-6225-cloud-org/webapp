const { Router } = require("express");
const productAuth = require('../auth/product.auth.js')
const auth = require('../auth/auth.js')


const productController = require("../controllers/product.controller.js");


var router = require("express").Router();


//product reqs
router.post("/product" ,auth, productController.createProduct);

router.get("/product/:id" , productController.getProductById);

router.delete("/product/:id" , productAuth , productController.deleteById)

router.put("/product/:id" , productAuth , productController.updateProductById)


//optional patch end point
router.patch("/product/:id" , productAuth , productController.patchProductById)


module.exports = router;

