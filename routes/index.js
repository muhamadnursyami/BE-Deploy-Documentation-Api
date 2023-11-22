const express = require("express");
const route = express.Router();
const uploadRoutes = require("./uploadRoutes");
const videoRoutes = require("./videoRoutes");
const authRoutes = require("./authRoutes");

route.get("/", (req, res) => {
  res.json("Selamat datang di Server BE Final Project");
});

route.use("/uploads", uploadRoutes);
route.use("/videos", videoRoutes);
route.use("/auth", authRoutes);
module.exports = route;
