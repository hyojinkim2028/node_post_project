const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
    unique: true
  },
  user: {
    type: String,
  },
  password: {
    type: String,

  },
  title: {
    type: String
  },
  content: {
    type: String
  }
});

module.exports = mongoose.model("Post", postSchema);