"use strict";
const CameraService = require("../../../service/camera/camera.service");
const cameraService = new CameraService();
const CameraDTO = require("../../../dto/camera/camera.dto");

const StandardResponse = require("../../../dto/res.dto");
const SuccessResponse = StandardResponse.SuccessResponse;
const ErrorResponse = StandardResponse.ErrorResponse;

const CustomizeError = require("../../../exception/customize-error");
const TAG = "CAMERA_CONTROLLER";

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

  updateCamera(req, res, next) {
    let _body = req._body;
    let cameraId = _body.id;
    if (!cameraId) {
      let error = new CustomizeError(TAG, 400, "CameraId not existed");
      next(error);
    } else {
      let newCamera = CameraDTO.infoUpdate(_body);
      cameraService.update(newCamera, cameraId).then(ressult => {
        let cameraResponse = CameraDTO.infoResponse(result);
        let successResponse = new SuccessResponse(200, "Success", cameraResponse);
        return res.status(200).res(successResponse);
      }, error => {
        next(error);
      })
    }
  }

  updateStatus(req, res, next) {

  }
}
module.exports = CameraManagerController;
