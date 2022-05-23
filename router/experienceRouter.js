const express = require("express");
const { updateExperience } = require("../controller/experienceController");
const {
  addExperienceValidators,
  addExperienceValidatorsHandler,
} = require("../middlewares/experience/experienceValidator");
const router = express.Router();

router.post(
  "/update",
  addExperienceValidators,
  addExperienceValidatorsHandler,
  updateExperience
);

module.exports = router;
