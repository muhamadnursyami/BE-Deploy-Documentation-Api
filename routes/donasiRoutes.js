const express = require("express");
const {
  donasiVideo,
  donasiBuku,
  totalDonasiByUser,
} = require("../controllers/donasi.controllers");
const upload = require("../utils/multer");
const route = express.Router();

// Rute untuk donasi video
route.post("/donasivideo/:id", upload.single("file"), donasiVideo);

// Rute untuk donasi buku
route.post(
  "/donasibuku/:id",
  upload.fields([
    { name: "img_url", maxCount: 1 },
    { name: "book_url", maxCount: 1 },
  ]),
  (req, res) => {
    // Memeriksa apakah file berhasil diunggah sebelum menyimpan atau memprosesnya
    if (!req.files || !req.files.img_url || !req.files.book_url) {
      return res.status(400).json({ error: "Some files are missing" });
    }
    donasiBuku(req, res);
  }
);

// Rute untuk total donasi by user
route.get("/total-donasi/:id", totalDonasiByUser);

module.exports = route;
