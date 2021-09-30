const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const tag = mongoose.model("tag", tagSchema);
module.exports = tag;
