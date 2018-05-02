const models = require("../models/index");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const SequelizeError = require("../common/SequelizeError");
const Op = Sequelize.Op;

class ProductService {
  create() {}

  update() {}

  updateStatus(productId, status) {
    return models.Product.update({ status }, { where: { id: productId } });
  }

  delete(productId) {
    return models.Product.destroy({ where: { id: productId } });
  }

  findById(productId) {
    return models.Product.findById(productId, {
      include: [
        {
          model: models.FileUpload,
          as: "images"
        }
      ]
    });
  }

  findAllByStore(params) {}
}

module.exports = ProductService;
