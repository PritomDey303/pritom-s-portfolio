const express = require("express");
const { checkLogin } = require("../controller/authController");
const router = express.Router();
const {
  insertProject,
  uploadProjectImg,
  getProject,
  getProjectById,
  deleteProjectById,
  updateProjectById,
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
router.post(
  "/update/:id",
  checkLogin,
  projectUpload,
  uploadProjectImg,
  addProjectValidators,
  addProjectValidatorsHandler,
  updateProjectById
);
router.get("/:id", getProjectById);
router.get("/", getProject);
router.delete("/deleteproject/:id", checkLogin, deleteProjectById);
module.exports = router;
