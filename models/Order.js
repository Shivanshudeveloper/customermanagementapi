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
  serviceId: {
    type: String,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  userMessage: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const order = mongoose.model("order", orderSchema);
module.exports = order;
