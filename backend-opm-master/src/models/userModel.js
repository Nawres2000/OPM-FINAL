const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  authority: {
    type: String,
    enum: ["client", "technician", "commercial"],
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  valid: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
