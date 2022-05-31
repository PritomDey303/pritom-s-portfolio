const mongoose = require("mongoose");
const { Schema } = mongoose;

const profilePictureSchema = new Schema(
  {
    user_id: {
      type: String,
      trim: true,
    },
    profile_picture: {
      type: Array,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProfilePicture = mongoose.model("ProfilePicture", profilePictureSchema);
module.exports = ProfilePicture;
