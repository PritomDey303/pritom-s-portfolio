const express = require("express");

const {
  insertAuthInfo,
  login,
  logout,
} = require("../controller/authController");
const {
  addAuthValidators,
  addAuthValidationHandler,
} = require("../middlewares/authentication/authValidator");
const router = express.Router();

router.post(
  "/signup",
  addAuthValidators,
  addAuthValidationHandler,
  insertAuthInfo
);
router.post("/login", login);
router.delete("/logout", logout);
module.exports = router;
