const Skills = require("../models/skills");
const ObjectId = require("mongodb").ObjectID;
////////////////////
//insert skills
////////////////////
async function insertSkill(req, res, next) {
  try {
    const skillData = await new Skills(req.body).save();
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
//////////////////////
//updateSkills
/////////////////////
async function updateSkill(req, res, next) {
  try {
    const id = ObjectId(req.params.id);
    const skillData = await Skills.findById(id);
    if (Object.keys(skillData).length) {
      const updatedData = await Skills.updateOne(
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

///////////////////////////////
//deleteskill
///////////////////////////
async function deleteSkill(req, res, next) {
  try {
    const id = ObjectId(req.params.id);
    const deletedData = await Skills.deleteOne({ _id: id });
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
//get skill data
//////////////////
async function getSkills(req, res, next) {
  try {
    const skillData = await Skills.find({}).exec();
    res.json({
      status: 200,
      data: skillData,
    });
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}
////////////////////
//get skill by id
////////////////

async function getSkillById(req, res, next) {
  try {
    const id = ObjectId(req.params.id);
    const skillData = await Skills.findById(id);
    res.json({
      status: 200,
      data: skillData,
    });
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}
////////////////////
module.exports = {
  insertSkill,
  updateSkill,
  deleteSkill,
  getSkills,
  getSkillById,
};
