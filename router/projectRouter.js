const express = require("express");
const { checkLogin } = require("../controller/authController");
const router = express.Router();
const {
  insertProject,
  uploadProjectImg,
  getProject,
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
  uploadProjectImg,
  addProjectValidators,
  addProjectValidatorsHandler,
  insertProject
);
router.get("/", getProject);
module.exports = router;
