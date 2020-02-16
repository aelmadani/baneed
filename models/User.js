const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  facebookId: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  favList: [String]
});

module.exports = User = mongoose.model("users", UserSchema);
