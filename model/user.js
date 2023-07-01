const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
  p_name: {
    type: String,
  },
  price: {
    type: String,
  },
  brand: {
    type: String,
  },
  description: {
    type: String,
  },
  p_img: {
    type: String,
  },
});

const all_product = mongoose.model("all_product", Comment);

module.exports = all_product;
