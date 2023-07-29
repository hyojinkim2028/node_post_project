const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({

  commentId: {
    type: Number,
  },
  user: {
    type: String,
  },
  password: {
    type: String,
  },
  content: {
    type: String
  }
});

module.exports = mongoose.model("Comment", commentSchema);