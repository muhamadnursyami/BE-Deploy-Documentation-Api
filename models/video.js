const mongoose = require("mongoose");
const { format } = require("date-fns");
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  likes: {
    type: String,
    default: "",
  },
  rating: {
    type: String,
    default: "⭐⭐⭐⭐⭐",
  },
  category: {
    type: String,
  },
  tanggal_upload: {
    type: Date,
    default: Date.now,
    set: function (value) {
      return new Date(value);
    },
    get: function (value) {
      return format(value, "MMM dd, yyyy");
    },
  },
  url_thumbnail: {
    type: String,
  },
  url_video: {
    type: String,
  },
  url_unduh: {
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

module.exports = mongoose.model("Video", videoSchema);
