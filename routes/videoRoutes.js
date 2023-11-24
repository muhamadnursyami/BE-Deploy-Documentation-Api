const express = require("express");
const {
  getVideoById,
  getAllVideo,
  deleteVideoById,
  deleteAllVideo,
} = require("../controllers/video.controllers");

const route = express.Router();

route.get("/", getAllVideo);
route.get("/:id", getVideoById);
route.delete("/:id", deleteVideoById);
// route.delete("/", deleteAllVideo);

module.exports = route;
