const express = require("express");
const { checkLogin } = require("../controller/authController");
const { updateExperience } = require("../controller/experienceController");
const {
  addExperienceValidators,
  addExperienceValidatorsHandler,
} = require("../middlewares/experience/experienceValidator");
const router = express.Router();

router.post(
  "/update",
  checkLogin,
  addExperienceValidators,
  addExperienceValidatorsHandler,
  updateExperience
);

module.exports = router;
