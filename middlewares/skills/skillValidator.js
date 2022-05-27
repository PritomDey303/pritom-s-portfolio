const { check, validationResult } = require("express-validator");
const res = require("express/lib/response");
const Authentication = require("../../models/authentication");
const ObjectId = require("mongodb").ObjectID;
const createError = require("http-errors");

const addSkillValidators = [
  check("skill_name")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Degree is required")
    .trim(),
  check("perchantage").optional().isNumeric().withMessage("Invalid Input."),
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
        throw createError("Invalid request!");
      }
    }),
];

const addSkillValidatorsHandler = function (req, res, next) {
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

module.exports = { addSkillValidators, addSkillValidatorsHandler };
