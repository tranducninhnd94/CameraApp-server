const express = require("express");
const router = express.Router();

const validation = require("express-validation");
const entryDataValidate = require("./validation/entry.data.validate");


const CameraManagerController = require("../api/controllers/camera/admin/camera.controller");
const cameraManagerController = new CameraManagerController();

const Auth = require("../api/controllers/auth/auth.controller");
const auth = new Auth();

router.post(
  "/admin/camera/create",
  auth.isAdmin,
  validation(entryDataValidate.createCamera),
  cameraManagerController.createCamera
);

module.exports = router;
