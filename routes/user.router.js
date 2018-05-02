const express = require("express");
const router = express.Router();

const validation = require("express-validation");
const entryDataValidate = require("./validation/entry.data.validate");

const UserController = require("../api/controllers/user/user.controller");
const userController = new UserController();

const Auth = require("../api/controllers/auth/auth.controller");
const auth = new Auth();
router
  //user
  .post(
    "/user/password/change",
    validation(entryDataValidate.changePassword),
    auth.isLogin,
    userController.changePassword
  )
  .post("/user/login", validation(entryDataValidate.login), userController.login);
module.exports = router;
