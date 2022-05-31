// external imports
const { check, validationResult } = require("express-validator");
const Authentication = require("../../models/authentication");
const createError = require("http-errors");
const cloudinary = require("../common/cloudinary");
const ObjectId = require("mongodb").ObjectID;
// add user
const addProfilePictureValidators = [
  check("profile_picture").optional().isArray().withMessage("Invalid input."),

  check("user_id")
    .isLength({ min: 1 })
    .withMessage("User id is required.")
    .trim()
    .custom(async (value) => {
      try {
        const data = await Authentication.findById(ObjectId(value));
        if (!Object.keys(data).length) {
          throw createError("Invalid request!");
        }
      } catch (err) {
        throw createError("Invalid requests!");
      }
    }),
];

const addProfilePictureValidationHandler = async function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    const destroy = async (public_id) => await cloudinary.destroy(public_id);

    for (const img of req.profile_picture) {
      const result = await destroy(img.public_id);
    }
    // response the errors
    res.json({
      status: 500,
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addProfilePictureValidationHandler,
  addProfilePictureValidators,
};
