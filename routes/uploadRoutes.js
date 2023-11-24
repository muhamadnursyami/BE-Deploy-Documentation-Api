const express = require("express");
const { uploadFile } = require("../controllers/upload.controllers");
const route = express.Router();
const upload = require("../utils/multer");

route.post("/", upload.single("file"), uploadFile);

module.exports = route;
