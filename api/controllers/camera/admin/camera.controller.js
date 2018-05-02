"use strict";
const CameraService = require("../../../service/camera/camera.service");
const cameraService = new CameraService();
const CameraDTO = require("../../../dto/camera/camera.dto");

const StandardResponse = require("../../../dto/res.dto");
const SuccessResponse = StandardResponse.SuccessResponse;
const ErrorResponse = StandardResponse.ErrorResponse;

class CameraManagerController {
  createCamera(req, res, next) {
    let _body = req.body;
    let newCamera = cameraDTO.infoCreate(_body);

    cameraService
      .create(newCamera)
      .then(result => {
        let cameraResponse = cameraDTO.infoResponse(result);
        let successResponse = new SuccessResponse(200, "Success", cameraResponse);
        res.status(200).res(successResponse);
      })
      .catch(error => {
        next(error);
      });

  }
}
module.exports = CameraManagerController;
