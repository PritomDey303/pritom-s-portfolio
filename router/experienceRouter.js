const express = require("express");
const { checkLogin } = require("../controller/authController");
const router = express.Router();
const {
  updateExperience,
  insertExperience,
  getExperience,
  deleteExperience,
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

router.delete("/delete/:id", checkLogin, deleteExperience);
module.exports = router;
