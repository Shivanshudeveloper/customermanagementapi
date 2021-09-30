const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const subscription = mongoose.model("subscription", subscriptionSchema);
module.exports = subscription;
