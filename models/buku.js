const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  tahun_terbit: {
    type: String,
  },
  rating: {
    type: String,
  },
  star: {
    type: String,
  },
  book_url: {
    type: String,
  },
  img_url: {
    type: String,
  },
  download_url: {
    type: String,
  },
  category: {
    type: String,
  },
  donaturId: {
    type: mongoose.ObjectId,
    ref: "Donasi",
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Book", bookSchema);
