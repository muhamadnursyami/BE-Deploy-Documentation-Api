const express = require("express");
const { donasiVideo } = require("../controllers/donasi.controllers");
const upload = require("../utils/multer");
const route = express.Router();

route.post("/donasivideo/:id", upload.single("file"), donasiVideo);

module.exports = route;
