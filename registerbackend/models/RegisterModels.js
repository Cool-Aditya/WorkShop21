const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileno: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpwd: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userTable", registerSchema);
