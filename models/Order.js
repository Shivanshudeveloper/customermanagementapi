const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const order = mongoose.model("order", orderSchema);
module.exports = order;
