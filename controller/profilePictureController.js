const cloudinary = require("../middlewares/common/cloudinary");
const fs = require("fs");
const ProfilePicture = require("../models/profilePicture");

async function cloudinaryProfilePictureUpload(req, res, next) {
  try {
    const uploader = async (path) =>
      await cloudinary.uploads(path, "profile_picture");

    if (req.method === "POST") {
      const urls = [];

      for (let file of req.files) {
        const { path } = file;
        const newPath = await uploader(path);

        urls.push(newPath);
        fs.unlinkSync(path);
      }

      req.profile_picture = urls;
      next();
    }
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}
///////////////////////////////////////////
/////////////////////////////////////////////
async function updateProfilePicture(req, res, next) {
  try {
    const updatedData = await ProfilePicture.findOneAndUpdate(
      { user_id: req.body.user_id },
      {
        $set: {
          user_id: req.body.user_id,
          profile_picture: req.profile_picture,
        },
      },
      { upsert: true, useFindAndModify: false }
    );
    console.log(updatedData);
    if (updatedData !== null) {
      //delete online images
      const destroy = async (public_id) => await cloudinary.destroy(public_id);
      const imgUrl = updatedData.profile_picture;
      for (const img of imgUrl) {
        const result = await destroy(img.public_id);
      }
    }
    res.json({
      status: 200,
      message: "Profile picture updated successfully.",
    });
  } catch (err) {
    const destroy = async (public_id) => await cloudinary.destroy(public_id);

    for (const img of req.profile_picture) {
      const result = await destroy(img.public_id);
      console.log(result);
    }
    res.json({
      status: 500,
      message: err.message,
    });
  }
}
///////////////////////////////////////////////////
//////////////////////////////////////////////////////
async function deleteProfilePicture(req, res, next) {
  try {
    const data = await ProfilePicture.find({}).exec();
    if (data.length) {
      const deletedData = await ProfilePicture.deleteOne({});

      //delete online images
      const destroy = async (public_id) => await cloudinary.destroy(public_id);
      const imgUrl = data[0].profile_picture;
      for (const img of imgUrl) {
        const result = await destroy(img.public_id);
      }
      res.json({
        status: 200,
        message: "Profile picture deleted successfully.",
      });
    } else {
      res.json({
        status: 500,
        message: "Invalid request",
      });
    }
  } catch (err) {
    res.json({
      status: 500,
      message: err.message,
    });
  }
}
module.exports = {
  cloudinaryProfilePictureUpload,
  updateProfilePicture,
  deleteProfilePicture,
};
