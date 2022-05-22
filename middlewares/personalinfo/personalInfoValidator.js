// external imports
const { check, validationResult } = require("express-validator");

// internal imports
const User = require("../../models/People");

// add user
const addUserValidators = [
  check("firstname")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("lastname")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain anything other than alphabet")
    .trim(),
  check("email").isEmail().withMessage("Invalid email address").trim(),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number"),
  check("facebook").isURL().withMessage("Invalid url."),
  check("github").isURL().withMessage("Invalid url."),
  check("linkedin").isURL().withMessage("Invalid url."),
  check("twitter").isURL().withMessage("Invalid url."),
  check("instagram").isURL().withMessage("Invalid url."),
];

const addUserValidationHandler = function (req, res, next) {
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
  addUserValidators,
  addUserValidationHandler,
};
