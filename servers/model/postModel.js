const mongoose = require("mongoose");

const post = new mongoose.Schema({
  userId: { type: String, required: true, },
  fullName: { type: String, required: true, },
  title: { type: String, required: false, },
  description: { type: String, required: true, },
  publishedDate: { type: Date, required: true, },
  approvedDate: { type: Date, required: true, },
  isActive: { type: Boolean, required: true, },
  isApproved: { type: Boolean, required: true, },
  images : { type: Array, required: true, },
});

const Post = mongoose.model("post", post);

module.exports = Post;
