const models = require("../../models/index");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;

class ProductService {
  create(newProduct, images, type) {
    return sequelize.transaction(t => {
      return models.Product.create(newProduct, { transaction: t }).then(product => {
        return models.Type.findById(type.id, { transaction: t }).then(type => {
          return product.setType(type, { transaction: t }).then(() => {
            let arrPromise = [];
            images.forEach(image => {
              arrPromise.push(models.ImageUpload.update({ priority: image.priority, product_id: product.id }, { where: { id: image.id }, transaction: t }));
            });
            return Promise.all(arrPromise).then(() => {
              return product;
            })
          })
        })
      })
    })
  }

  update() { }

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

  findAllByStore(params) { }
}

module.exports = ProductService;
