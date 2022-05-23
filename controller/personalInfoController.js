const Authentication = require("../models/authentication");
const PersonalInfo = require("../models/personalInfo");
const ObjectId = require("mongodb").ObjectID;

async function updatePersonalInfo(req, res, next) {
  try {
    const id = ObjectId(req.body.user_id);

    const user = await Authentication.findById(id).exec();

    if (user) {
      const updatedData = await PersonalInfo.findOneAndUpdate(
        { user_id: req.body.user_id },
        { $set: req.body },
        { upsert: true, useFindAndModify: false }
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
        message: "Invalid request.",
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}

async function getPersonalInfo(req, res, next) {
  try {
    const data = await PersonalInfo.findOne({})
      .exec()
      .catch((err) => {
        res.json({
          status: 500,
          message: err.message,
        });
      });

    res.send(data);
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}

module.exports = { updatePersonalInfo, getPersonalInfo };
