const mongoose = require("mongoose");
const { Schema } = mongoose;

const authenticationSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Authentication = mongoose.model("Authentication", authenticationSchema);
module.exports = Authentication;
