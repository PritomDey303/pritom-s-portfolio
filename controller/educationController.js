const EducationInfo = require("../models/educationInfo");
const ObjectId = require("mongodb").ObjectID;
//insert education info
//////////////////////
async function insertEducation(req, res, next) {
  try {
    const educationData = await new EducationInfo(req.body).save();
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
////////////////////
//update education info
////////////////////////
async function updateEducation(req, res, next) {
  try {
    const id = ObjectId(req.params.id);
    const data = await EducationInfo.findById(id);
    if (Object.keys(data).length) {
      const updatedData = await EducationInfo.updateOne(
        { _id: id },
        { $set: req.body }
      );
      res.json({
        status: 200,
        message: "Data updated successfully.",
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

/////////////////////
//delete educationInfo
///////////////////////
async function deleteEducation(req, res, next) {
  try {
    const id = ObjectId(req.params.id);
    const deletedData = await EducationInfo.deleteOne({ _id: id });
    res.json({
      status: 200,
      message: "Data deleted successfully.",
      data: deletedData,
    });
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}

//////////////////////
//get education
///////////////////
async function getEducation(req, res, next) {
  try {
    const educationData = await EducationInfo.find({}).exec();
    res.json({
      status: 200,
      data: educationData,
    });
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}

//........................................
//get education by id
////////////////////////////////////
async function getEducationById(req, res, next) {
  try {
    const id = ObjectId(req.params.id);

    const educationData = await EducationInfo.findById(id);
    res.json({
      status: 200,
      data: [educationData],
    });
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}
module.exports = {
  insertEducation,
  updateEducation,
  deleteEducation,
  getEducation,
  getEducationById,
};
