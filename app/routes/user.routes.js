const { Router } = require("express");
const auth = require('../auth/auth.js')

const productAuth = require('../auth/product.auth.js')

const userController = require("../controllers/user.controller.js");

var router = require("express").Router();

const statsDMiddleware = require("../utils/statsDMiddleware.js");



router.post("/user", userController.create);

router.get("/user/:id" ,statsDMiddleware, auth, userController.getById);

router.put("/user/:id" , statsDMiddleware, auth, userController.updateById);




module.exports = router;  