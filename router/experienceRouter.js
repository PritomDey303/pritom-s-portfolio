const express = require("express");
const { checkLogin } = require("../controller/authController");
const router = express.Router();
const {
  updateExperience,
  insertExperience,
  getExperience,
} = require("../controller/experienceController");
const {
  addExperienceValidators,
  addExperienceValidatorsHandler,
} = require("../middlewares/experience/experienceValidator");
router.get("/", getExperience);
router.post("/update", checkLogin, updateExperience);
router.post(
  "/insert",
  checkLogin,
  addExperienceValidators,
  addExperienceValidatorsHandler,
  insertExperience
);

module.exports = router;
