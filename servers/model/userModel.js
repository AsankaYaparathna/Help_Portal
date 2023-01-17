const mongoose = require("mongoose");

const user = new mongoose.Schema({
  fName: { type: String, required: true, },
  lName: { type: String, required: true, },
  address: { type: String, required: false, },
  email: { type: String, required: true, },
  mobileNumber: { type: Number, default: 0, },
  password: { type: String, required: true, },
  isActive: { type: Boolean, required: true, },
  userType: { type: String, required: true, },
});

const User = mongoose.model("user", user);

module.exports = User;