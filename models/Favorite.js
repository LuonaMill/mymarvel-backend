const mongoose = require("mongoose");

const Favorite = mongoose.model("Favorite", {
  name: String,
  token: String,
  picturepath: String,
  pictureextension: String,
  description: String,
});

module.exports = Favorite;
