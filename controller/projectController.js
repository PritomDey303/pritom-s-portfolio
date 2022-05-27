const fs = require("fs");
const cloudinary = require("../middlewares/common/cloudinary");
const Project = require("../models/project");
async function uploadProjectImg(req, res, next) {
  try {
    const uploader = async (path) =>
      await cloudinary.uploads(path, "project_img");
    if (req.method === "POST") {
      const urls = [];

      const files = req.files;

      for (const file of files) {
        const { path } = file;

        const newPath = await uploader(path);

        urls.push(newPath);
        fs.unlinkSync(path);
      }
      req.project_img = urls;
      next();
    } else {
      res.json({
        status: 405,
        message: "Images not uploaded successfully.",
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}

//insert project data
async function insertProject(req, res, next) {
  try {
    const projectData = await new Project({
      ...req.body,
      project_img: req.project_img,
    }).save();
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
module.exports = { uploadProjectImg, insertProject };
