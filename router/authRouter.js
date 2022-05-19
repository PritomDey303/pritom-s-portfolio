const express = require("express");
const { insertAuthInfo, login } = require("../controller/authController");
const router = express.Router();

router.post("/insert", insertAuthInfo);
router.post("/login", login);
module.exports = router;
