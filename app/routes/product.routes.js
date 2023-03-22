const { Router } = require("express");
const productAuth = require('../auth/product.auth.js')
const auth = require('../auth/auth.js')


const productController = require("../controllers/product.controller.js");


var router = require("express").Router();

const statsDMiddleware = require("../utils/statsDMiddleware.js");


//product reqs
router.post("/product" ,statsDMiddleware,auth, productController.createProduct);

router.get("/product/:id" , productController.getProductById);

router.delete("/product/:id" ,statsDMiddleware, productAuth , productController.deleteById)

router.put("/product/:id" ,statsDMiddleware, productAuth , productController.updateProductById)


//optional patch end point
router.patch("/product/:id" , statsDMiddleware,productAuth , productController.patchProductById)


module.exports = router;

