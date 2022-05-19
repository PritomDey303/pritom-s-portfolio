const mongoose = require("mongoose");
const { Schema } = mongoose;

const eductionSchema = new Schema(
  {
    degree: {
      type: String,
      required: true,
      trim: true,
    },
    institution: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const EducationInfo = mongoose.model("EducationInfo", eductionSchema);
module.exports = EducationInfo;
