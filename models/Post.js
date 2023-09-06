const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true
  },
  video: {
    publicUrl: {
        type: String,
        required: true
    }
  },
  resolution: {
    type: String,
    required: true
  },
  codec:{
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  }},
  { 
    timestamps: true 
   }
);

const User = mongoose.model("User", userSchema);

module.exports = User;