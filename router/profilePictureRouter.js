const express = require("express");
const { checkLogin } = require("../controller/authController");
const {
  cloudinaryProfilePictureUpload,
  updateProfilePicture,
  deleteProfilePicture,
} = require("../controller/profilePictureController");
const profilePictureUpload = require("../middlewares/profilePicture/profilePictureUpload");
const {
  addProfilePictureValidators,
  addProfilePictureValidationHandler,
} = require("../middlewares/profilePicture/profilePictureValidator");
const router = express.Router();

router.post(
  "/update",
  checkLogin,
  profilePictureUpload,
  cloudinaryProfilePictureUpload,
  addProfilePictureValidators,
  addProfilePictureValidationHandler,
  updateProfilePicture
);
router.delete("/delete", checkLogin, deleteProfilePicture);
module.exports = router;
