const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Bookmark", bookSchema);
