const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  toEmail: {
    type: String,
    required: true,
  },
  toId: {
    type: String,
    required: true,
  },
  cc: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: false,
  },
  chat: { type: Array, required: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const ticket = mongoose.model("ticket", ticketSchema);
module.exports = ticket;
