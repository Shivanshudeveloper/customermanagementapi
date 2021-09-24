const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const invoice = mongoose.model("invoice", invoiceSchema);
module.exports = invoice;
