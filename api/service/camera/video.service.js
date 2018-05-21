const models = require("../../models/index");
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;

class VideoService {

    create(newVideo) {
        return models.Video.create(newVideo);
    }
} 