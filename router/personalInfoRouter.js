const express = require("express");
const {
  insertPersonalInfo,
  updatePersonalInfo,
} = require("../controller/personalInfoController");
const router = express.Router();

router.post("/update", updatePersonalInfo);
module.exports = router;
