const express = require("express");
const { checkLogin } = require("../controller/authController");
const router = express.Router();
const {
  insertProject,
  uploadProjectImg,
} = require("../controller/projectController");

const projectUpload = require("../middlewares/project/projectUpload");
const {
  addProjectValidatorsHandler,
  addProjectValidators,
} = require("../middlewares/project/projectValidator");

router.post(
  "/insert",
  checkLogin,
  projectUpload,
  addProjectValidators,
  addProjectValidatorsHandler,
  uploadProjectImg,
  insertProject
);
module.exports = router;
