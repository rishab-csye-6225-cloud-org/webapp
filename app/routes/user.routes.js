const { Router } = require("express");
const auth = require('../auth/auth.js')

const productAuth = require('../auth/product.auth.js')

const userController = require("../controllers/user.controller.js");

var router = require("express").Router();

router.post("/user", userController.create);

router.get("/user/:id" ,auth, userController.getById);

router.put("/user/:id" ,auth, userController.updateById);




module.exports = router;  