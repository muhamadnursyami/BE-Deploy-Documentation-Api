const express = require("express");
const {
  uploadFile,
  getBukuById,
  getAllBuku,
} = require("../controllers/buku.controllers");
const multer = require("multer");
const route = express.Router();

const storage = multer.memoryStorage();
const kirim = multer({ storage });

route.post(
  "/uploads",
  kirim.fields([
    { name: "img_url", maxCount: 1 },
    { name: "book_url", maxCount: 1 },
  ]),
  (req, res) => {
    // Memeriksa apakah file berhasil diunggah sebelum menyimpan atau memprosesnya
    if (!req.files) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    uploadFile(req, res);
  }
);

route.get("/", getAllBuku);
route.get("/:id", getBukuById);

module.exports = route;
