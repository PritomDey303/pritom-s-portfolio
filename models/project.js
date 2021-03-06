const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    technologies: {
      type: Array,
      required: true,
    },
    frontend_code_link: {
      type: String,
      trim: true,
    },
    backend_code_link: {
      type: String,
      trim: true,
    },
    live_site_link: {
      type: String,
      trim: true,
    },
    project_img: {
      type: Array,
    },
    user_id: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
