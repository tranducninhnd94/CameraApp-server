"use strict";
const CameraService = require("../../../service/camera/camera.service");
const cameraService = new CameraService();
const CameraDTO = require("../../../dto/camera/camera.dto");

const StandardResponse = require("../../../dto/res.dto");
const SuccessResponse = StandardResponse.SuccessResponse;
const ErrorResponse = StandardResponse.ErrorResponse;

const CustomizeError = require("../../../exception/customize-error");
const TAG = "VIDEO_CONTROLLER";

const constant = require("../../../common/constants");

class VideoController {
    createVideo(req, res, next){

    }

    updateVideo(req, res, next){

    }

    getAllVideo(req, res, next){
        
    }
}

module.exports = VideoController;