const { check, validationResult } = require("express-validator");
const res = require("express/lib/response");
const Authentication = require("../../models/authentication");
const ObjectId = require("mongodb").ObjectID;
const createError = require("http-errors");

const addEducationValidators = [
  check("degree")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Degree is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Degree must not contain anything other than alphabet")
    .trim(),
  check("institution")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Institution name is required.")

    .trim(),
  check("description").optional().trim(),
  check("start_date").optional().isDate().withMessage("Valid date required."),
  check("end_date").optional().isDate().withMessage("Valid date required."),
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
        throw createError("Invalid request!");
      }
    }),
];

const addEducationValidatorsHandler = function (req, res, next) {
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

module.exports = { addEducationValidators, addEducationValidatorsHandler };
