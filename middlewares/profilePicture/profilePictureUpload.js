const uploader = require("../../utilities/multerUploader");

function profilePictureUpload(req, res, next) {
  const upload = uploader(
    "profile_picture",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpg, jpeg or .png format allowed!"
  );

  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        status: 500,
        message: err.message,
      });
    } else {
      next();
    }
  });
}

module.exports = profilePictureUpload;
