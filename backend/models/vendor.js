const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 3
  },
  totalRatings:{
      type: Number,
      default: 1
  }
});

module.exports = mongoose.model("Vendor", VendorSchema);
