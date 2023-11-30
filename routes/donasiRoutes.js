const express = require("express");
const {
  donasiVideo,
  donasiBuku,
  donasiUang,
  totalDonasiByUser,
  totalDonasiVideo,
} = require("../controllers/donasi.controllers");
const upload = require("../utils/multer");
const route = express.Router();

route.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept, Authorization"
  );
  next();
});

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


route.post("/donasiuang/:id", donasiUang);
// Rute untuk total donasi by user
route.get("/total-donasi/:id", totalDonasiByUser);
route.get("/all-donasi-videos", totalDonasiVideo);

module.exports = route;
