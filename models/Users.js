const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});
const user = mongoose.model("user", userSchema);
module.exports = user;
