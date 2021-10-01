const mongoose = require("mongoose");

const tagticketSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
  },
  ticketId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const tagticket = mongoose.model("tagticket", tagticketSchema);
module.exports = tagticket;
