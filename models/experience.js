const mongoose = require("mongoose");
const { Schema } = mongoose;

const experienceSchema = new Schema(
  {
    designation: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", experienceSchema);
module.exports = Experience;
