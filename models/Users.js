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
  companyName: {
    type: String,
    required: false,
  },
  companyImage: {
    type: String,
    required: false,
  },
  messages: {
    type: Array,
    required: false,
    default: [],
  },
  tags: {
    type: Array,
    required: false,
    default: [],
  },
  emailSettings: {
    type: Object,
    required: false,
    default: {},
  },
  templates: {
    type: Array,
    required: false,
    default: [],
  },
  contactForms: {
    type: Array,
    required: false,
    default: [],
  },
  team: {
    type: Array,
    required: false,
    default: [],
  },
});
const user = mongoose.model("user", userSchema);
module.exports = user;
