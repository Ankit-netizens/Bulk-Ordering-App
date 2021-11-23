const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  totalQuantity: {
    type: Number
  }
});
ProductSchema.pre("save", function(next) {
  this.totalQuantity = this.quantity;
  next();
});
module.exports = mongoose.model("Product", ProductSchema);
