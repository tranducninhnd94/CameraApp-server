const express = require("express");
const router = express.Router();

const validation = require("express-validation");
const entryDataValidate = require("./validation/entry.data.validate");

const ProductManagerController = require("../api/controllers/product/admin/product-manager.controller");
const productManagerController = new ProductManagerController();

const ProductController = require("../api/controllers/product/product.controller");
const productController = new ProductController();

const Auth = require("../api/controllers/auth/auth.controller");
const auth = new Auth();

router.post(
  "/admin/product/create",
  validation(entryDataValidate.createProduct),
  productManagerController.createProduct
);

module.exports = router;
