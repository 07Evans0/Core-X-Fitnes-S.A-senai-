const express = require("express");
const router = express.Router();
const productController = require("../controller/produtos.controller");

router.get('/produtos', productController.getAllProducts);

module.exports = router;