const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  number : {
    type:String,
  },
  password :{
    type:String,
  }
  
});

const login = mongoose.model("login", Comment);

module.exports = login;
