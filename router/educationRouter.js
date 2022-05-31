const express = require("express");
const { checkLogin } = require("../controller/authController");
const {
  insertEducation,
  updateEducation,
  deleteEducation,
  getEducation,
  getEducationById,
} = require("../controller/educationController");
const {
  addEducationValidators,
  addEducationValidatorsHandler,
} = require("../middlewares/education/educationValidator");
const router = express.Router();

router.post(
  "/insert",
  checkLogin,
  addEducationValidators,
  addEducationValidatorsHandler,
  insertEducation
);
router.post(
  "/update/:id",
  checkLogin,
  addEducationValidators,
  addEducationValidatorsHandler,
  updateEducation
);
router.delete(
  "/delete/:id",
  checkLogin,
  addEducationValidators,
  addEducationValidatorsHandler,
  deleteEducation
);

router.get("/", getEducation);
router.get("/geteducation/:id", getEducationById);
module.exports = router;
