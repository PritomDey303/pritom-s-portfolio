const mongoose = require("mongoose");
const { Schema } = mongoose;

const skillsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  perchantage: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    trim: true,
    required: true,
  },
});

const Skills = mongoose.model("Skills", skillsSchema);
module.exports = Skills;
