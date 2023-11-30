const mongoose = require("mongoose");

const donasiSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bookID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
  videoID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
  uangID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Uang",
  },
});

module.exports = mongoose.model("Donasi", donasiSchema);
