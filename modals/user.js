const mongoose = require("mongoose");

// Creating a schema here
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Creating a collection (inputting values) ... Name is USER here ....
const User = mongoose.model("User", userSchema);

module.exports = User;
