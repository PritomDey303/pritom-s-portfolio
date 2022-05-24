// external imports
const { check, validationResult } = require("express-validator");
const Authentication = require("../../models/authentication");
const createError = require("http-errors");

// add user
const addPersonalInfoValidators = [
  check("firstname")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("lastname")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .trim(),
  check("mobile")
    .optional()
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number"),
  check("facebook").optional().isURL().withMessage("Invalid url."),
  check("github").optional().isURL().withMessage("Invalid url."),
  check("linkedin").optional().isURL().withMessage("Invalid url."),
  check("twitter").optional().isURL().withMessage("Invalid url."),
  check("instagram").optional().isURL().withMessage("Invalid url."),
  check("user_id")
    .isLength({ min: 1 })
    .withMessage("User id is required.")
    .trim()
    .custom(async (value) => {
      try {
        const data = await Authentication.findById(ObjectId(value));
        if (!data.length) {
          throw createError("Invalid request!");
        }
      } catch (err) {
        res.json({
          status: 500,
          message: "Sorry! Something went wrong.",
        });
      }
    }),
];

const addPersonalInfoValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    res.json({
      status: 500,
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addPersonalInfoValidators,
  addPersonalInfoValidationHandler,
};
