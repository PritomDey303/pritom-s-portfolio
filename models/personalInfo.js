const mongoose = require("mongoose");
const { Schema } = mongoose;

const personalInfoSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    email: {
      type: String,

      trim: true,
    },
    mobile: {
      type: String,

      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    github: {
      type: String,

      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    user_id: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const PersonalInfo = mongoose.model("personalInfo", personalInfoSchema);
module.exports = PersonalInfo;
