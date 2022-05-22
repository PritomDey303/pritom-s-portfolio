const PersonalInfo = require("../models/personalInfo");

async function updatePersonalInfo(req, res, next) {
  try {
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
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}

module.exports = { updatePersonalInfo };
