const fs = require("fs");
const cloudinary = require("../middlewares/common/cloudinary");
const Project = require("../models/project");
const ObjectId = require("mongodb").ObjectID;
async function uploadProjectImg(req, res, next) {
  try {
    const uploader = async (path) =>
      await cloudinary.uploads(path, "project_img");
    if (req.method === "POST") {
      const urls = [];

      for (let file of req.files) {
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
////////////////
//insert project data
//////////////////////////////
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
    const destroy = async (public_id) => await cloudinary.destroy(public_id);

    for (const img of req.project_img) {
      const result = await destroy(img.public_id);
    }
    res.json({
      status: 500,
      message: err.message,
    });
  }
}

////////////////////////
//////////////////////////
//get project
////////////////////////
async function getProject(req, res, next) {
  try {
    const projectData = await Project.find({});
    res.json({
      status: 200,
      data: projectData,
    });
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}
//////////////////////////////////////////
//////////////////////////////////////
async function getProjectById(req, res, next) {
  try {
    const id = ObjectId(req.params.id);
    const projectData = await Project.findById(id);
    res.json({
      status: 200,
      data: projectData,
    });
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}
/////////////////////////////////////////////
/////////////////////////////////
async function filteredProject(req, res, next) {
  try {
    const tech = req.params.tech;
    console.log(tech);
    const projectData = await Project.find({
      technologies: tech,
    }).exec();
    res.json({
      status: 200,
      data: projectData,
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      status: 500,
      message: err.message,
    });
  }
}
/////////////////////////////////////////
////////////////////////////////////////
async function deleteProjectById(req, res, next) {
  try {
    const id = ObjectId(req.params.id);
    const projectData = await Project.findById(id);
    const { project_img } = projectData;
    const tempArr = project_img;
    const deletedItem = await Project.findByIdAndDelete(id);

    //delete online images
    const destroy = async (public_id) => await cloudinary.destroy(public_id);

    for (const img of tempArr) {
      const result = await destroy(img.public_id);
      console.log(result);
    }
    res.json({
      status: 200,
      message: "Project deleted successfully.",
    });
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}
//////////////////////////
/////////////////////////
async function updateProjectById(req, res, next) {
  const id = ObjectId(req.params.id);
  try {
    const project = await Project.findById(id);
    if (Object.keys(project).length !== 0) {
      if (req.project_img.length !== 0) {
        let updatedData = await Project.findOneAndUpdate(
          { _id: id },
          { $set: { ...req.body, project_img: req.project_img } }
        );

        //delete online images
        const destroy = async (public_id) =>
          await cloudinary.destroy(public_id);
        const imgUrl = updatedData.project_img;
        for (const img of imgUrl) {
          const result = await destroy(img.public_id);
        }
      } else {
        let updatedData = await Project.findOneAndUpdate(
          { _id: id },
          { $set: { ...req.body } }
        );

        //delete online images
        const destroy = async (public_id) =>
          await cloudinary.destroy(public_id);
        const imgUrl = updatedData.project_img;
        for (const img of imgUrl) {
          const result = await destroy(img.public_id);
        }
      }

      res.json({
        status: 200,
        message: "Data updated succuessfully.",
      });
    } else {
      res.json({
        status: 500,
        message: "Invalid Project Id",
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}
/////////////
module.exports = {
  uploadProjectImg,
  insertProject,
  getProject,
  getProjectById,
  deleteProjectById,
  updateProjectById,
  filteredProject,
};
