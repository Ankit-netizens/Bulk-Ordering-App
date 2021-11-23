const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 3
  },
  review: {
    type: String
  }
});

module.exports = mongoose.model("Order", OrderSchema);
