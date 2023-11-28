const express = require("express");
const { donasiVideo, donasiBuku } = require("../controllers/donasi.controllers");
const upload = require("../utils/multer");
const route = express.Router();

route.post("/donasivideo/:id", upload.single("file"), donasiVideo);
route.post("/donasibuku/:id", upload.fields([{ name: 'img_url', maxCount: 1 }, { name: 'book_url', maxCount: 1 }]), (req, res) => {
    // Memeriksa apakah file berhasil diunggah sebelum menyimpan atau memprosesnya
    if (!req.files) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    donasiBuku(req, res);
});

module.exports = route;
