const PersonalInfo = require("../models/personalInfo");

async function insertPersonalInfo(req, res, next) {
  console.log("pritom");
  res.send("prink");
}

module.exports = { insertPersonalInfo };
