const uploader = require("../../utilities/multerUploader");

function projectUpload(req, res, next) {
  const upload = uploader(
    "project_img",
    ["image/jpeg", "image/jpg", "image/png", "image/gif"],
    1000000,
    "Only .jpg, jpeg, .gif or .png format allowed!"
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

module.exports = projectUpload;
