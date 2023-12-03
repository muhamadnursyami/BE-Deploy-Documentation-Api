/**
 * @swagger
 * components:
 *   schemas:
 *     Donasi:
 *       type: object
 *       properties:
 *         userID:
 *           type: string
 *           format: uuid
 *           description: User ID
 *         bookID:
 *           type: string
 *           format: uuid
 *           description: Book ID
 *         videoID:
 *           type: string
 *           format: uuid
 *           description: Video ID
 *         uangID:
 *           type: string
 *           format: uuid
 *           description: Uang ID
 */

/**
 * @swagger
 * tags:
 *   name: Donasi
 *   description: Donation operations
 */
const express = require("express");
const {
  donasiVideo,
  donasiBuku,
  donasiUang,
  totalDonasiByUser,
  totalDonasiVideo,
  totalDonasiBuku,
  totalDonasiUang,
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
/**
 * @swagger
 *
 * /donasi/donasivideo/{id}:
 *   post:
 *     summary: Donate a video
 *     description: Donate a video with the provided information
 *     tags: [Donasi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Donation successful
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
// Rute untuk donasi video
route.post("/donasivideo/:id", upload.single("file"), donasiVideo);

/**
 * @swagger
 *
 * /donasi/donasibuku/{id}:
 *   post:
 *     summary: Donate a book
 *     description: Donate a book with the provided information
 *     tags: [Donasi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               img_url:
 *                 type: string
 *                 format: binary
 *               book_url:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Donation successful
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
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
/**
 * @swagger
 *
 * /donasi/donasiuang/{id}:
 *   post:
 *     summary: Donate money
 *     description: Donate money with the provided information
 *     tags: [Donasi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nominal:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Donation successful
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
route.post("/donasiuang/:id", donasiUang);
/**
 * @swagger
 *
 * /donasi/total-donasi/{id}:
 *   get:
 *     summary: Get total donations by user
 *     description: Retrieve the total amount of donations for a specific user
 *     tags: [Donasi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalDonasi:
 *                   type: number
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
// Rute untuk total donasi by user
route.get("/total-donasi/:id", totalDonasiByUser);
/**
 * @swagger
 *
 * /donasi/all-donasi-videos:
 *   get:
 *     summary: Get total donations for videos
 *     description: Retrieve the total amount of donations for videos
 *     tags: [Donasi]
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalDonasiVideos:
 *                   type: number
 *       '500':
 *         description: Internal server error
 */
route.get("/all-donasi-videos", totalDonasiVideo);
/**
 * @swagger
 *
 * /donasi/all-donasi-buku:
 *   get:
 *     summary: Get total donations for books
 *     description: Retrieve the total amount of donations for books
 *     tags: [Donasi]
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalDonasiBuku:
 *                   type: number
 *       '500':
 *         description: Internal server error
 */
route.get("/all-donasi-buku", totalDonasiBuku);
/**
 * @swagger
 *
 * /donasi/all-donasi-uang:
 *   get:
 *     summary: Get total donations in money
 *     description: Retrieve the total amount of donations in money
 *     tags: [Donasi]
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalDonasiUang:
 *                   type: number
 *       '500':
 *         description: Internal server error
 */
route.get("/all-donasi-uang", totalDonasiUang);

module.exports = route;
