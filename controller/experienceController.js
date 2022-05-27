const Authentication = require("../models/authentication");
const Experience = require("../models/experience");
const ObjectId = require("mongodb").ObjectID;

async function updateExperience(req, res, next) {
  try {
    const id = ObjectId(req.body.user_id);
    const user = await Authentication.findById(id);
    if (user) {
      const updatedData = await Experience.findOneAndUpdate(
        { _id: ObjectId(req.body._id) },
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

async function getExperience(req, res, next) {
  try {
    const data = await Experience.find({}).exec();
    res.send(data);
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}

//insert experience
async function insertExperience(req, res, next) {
  try {
    const experience = await new Experience(req.body).save();
    res.json({
      status: 200,
      message: "Data inserted successfully.",
    });
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}
module.exports = { updateExperience, getExperience, insertExperience };
