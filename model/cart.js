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
  p_img :{
    type: String, 
  },
  p_id :{
    type: String, 
  },
  quantity:{
    type: String
  } 
});

const cart = mongoose.model("cart", Comment);

module.exports = cart;
