const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
});

const User = mongoose.model("details", UserSchema);

module.exports = User;
