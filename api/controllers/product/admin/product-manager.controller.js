"use strict";
const ProductService = require("../../../service/product/product.service");
const productService = new ProductService();

class ProductManagerController {
  createProduct(req, res, next) {}

  updateProduct(req, res, next) {}

  updateStatus(req, res, next) {}

  deleteProduct(req, res, next) {}

  getDetailProduct(req, res, next) {}

  findAllByStore(req, res, next) {}
}
module.exports = ProductManagerController;
