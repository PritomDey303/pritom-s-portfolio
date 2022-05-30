const express = require("express");
const { checkLogin } = require("../controller/authController");
const {
  insertSkill,
  updateSkill,
  deleteSkill,
  getSkillById,
  getSkills,
} = require("../controller/skillController");
const {
  addSkillValidators,
  addSkillValidatorsHandler,
} = require("../middlewares/skills/skillValidator");
const router = express.Router();

router.post(
  "/insert",
  checkLogin,
  addSkillValidators,
  addSkillValidatorsHandler,
  insertSkill
);

router.post(
  "/update/:id",
  checkLogin,
  addSkillValidators,
  addSkillValidatorsHandler,
  updateSkill
);

router.get("/", getSkills);
router.get("/:id", getSkillById);

router.delete("/delete/:id", checkLogin, deleteSkill);
module.exports = router;
