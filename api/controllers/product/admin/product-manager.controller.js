"use strict";
const ProductService = require("../../../service/product/product.service");
const productService = new ProductService();

const ProductDTO = require("../../../dto/product/product.dto");
const ImageUploadDTO = require("../../../dto/file/image-upload.dto");

const StandardResponse = require("../../../dto/res.dto");
const SuccessResponse = StandardResponse.SuccessResponse;
const ErrorResponse = StandardResponse.ErrorResponse;

class ProductManagerController {
  createProduct(req, res, next) {
    let _body = req.body;
    let newProduct = ProductDTO.infoCreate(_body);
    let images = _body.images;
    let type = _body.type;
    productService.create(newProduct, images, type).then(result => {
      let successError = new SuccessResponse(200, "Success", result);
      res.status(200);
      return res.json(successError);
    }).catch(error => {
      next(error);
    })
  }

  updateProduct(req, res, next) { }

  updateStatus(req, res, next) { }

  deleteProduct(req, res, next) { }

  getDetailProduct(req, res, next) { }

  findAllByStore(req, res, next) { }
}
module.exports = ProductManagerController;
