/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         author:
 *           type: string
 *         tahun_terbit:
 *           type: string
 *         rating:
 *           type: string
 *         star:
 *           type: string
 *         book_url:
 *           type: string
 *         img_url:
 *           type: string
 *         download_url:
 *           type: string
 *         category:
 *           type: string
 *         donaturId:
 *           type: string
 *           format: uuid
 *         status:
 *           type: boolean
 *           default: false
 */

/**
 * @swagger
 * tags:
 *   name: Book
 *   description: Book operations
 */
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
/**
 * @swagger
 * /books/uploads:
 *   post:
 *     summary: Upload files for a book
 *     description: Upload files (img_url and book_url) for a book
 *     tags: [Book]
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
 *         description: Files uploaded successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
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
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve a list of all books
 *     tags: [Book]
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       '500':
 *         description: Internal server error
 */
route.get("/", getAllBuku);
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Retrieve a book by its ID
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Book ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */
route.get("/:id", getBukuById);

module.exports = route;
