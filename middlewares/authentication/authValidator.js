// external imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const Authentication = require("../../models/authentication");

// add user
const addAuthValidators = [
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await Authentication.findOne({ email: value });
        if (user) {
          throw createError("Email already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol"
    ),
];

const addAuthValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addAuthValidators,
  addAuthValidationHandler,
};
