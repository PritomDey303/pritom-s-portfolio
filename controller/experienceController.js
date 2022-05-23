const Authentication = require("../models/authentication");
const ObjectId = require("mongodb").ObjectID;
const Experience = require("../models/experience");
async function updateExperience(req, res, next) {
  try {
    const id = ObjectId(req.body.user_id);
    const user = await Authentication.findById(id);
    if (user) {
      const updatedData = await Experience.findOneAndUpdate(
        { user_id: req.body.user_id },
        { $set: req.body }
      ).catch((err) => {
        res.json({
          status: 500,
          message: err.message,
        });
      });
      res.json({
        status: 200,
        message: "data updated successfully.",
      });
    } else {
      res.json({
        status: 500,
        message: "Invalid user.",
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}

module.exports = { updateExperience };
