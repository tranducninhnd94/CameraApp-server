const models = require("../../models/index");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;

class ProductService {
  create(obj) {
    return models.Camera.create(obj);
  }

  update(cameraReq) {
    return models.Camera.update(obj, { where: { id: cameraId } });
  }

  delete() {
    return models.Camera.destroy({ where: { id: cameraId } });
  }

  findById() {
    return models.Camera.findById(cameraId);
  }

  findAll(params) {
    let uri = params.uri;
    let location = params.location;

    let conditions = {};

    if (location) {
      conditions.location = { [Op.like]: location };
    }

    if (uri) {
      conditions.uri = { [Op.eq]: uri };
    }

    return models.Camera.findAll({ where: conditions });
  }
}

module.exports = ProductService;
