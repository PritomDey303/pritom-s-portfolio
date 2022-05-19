const mongoose = require("mongoose");
const { Schema } = mongoose;

const personalInfoSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
      required: true,
    },
    linkedin: {
      type: String,
      trim: true,
      required: true,
    },
    github: {
      type: String,
      required: true,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
      required: true,
    },
    twitter: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PersonalInfo = mongoose.model("personalInfo", personalInfoSchema);
module.exports = PersonalInfo;
