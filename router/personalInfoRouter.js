const express = require("express");
const {
  updatePersonalInfo,
  getPersonalInfo,
} = require("../controller/personalInfoController");
const {
  addPersonalInfoValidators,
  addPersonalInfoValidationHandler,
} = require("../middlewares/personalinfo/personalInfoValidator");
const router = express.Router();

router.post(
  "/update",
  addPersonalInfoValidators,
  addPersonalInfoValidationHandler,
  updatePersonalInfo
);
router.get("/", getPersonalInfo);
module.exports = router;
