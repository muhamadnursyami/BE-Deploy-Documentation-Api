/**
 * @swagger
 * components:
 *   schemas:
 *     Bookmark:
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
 */

/**
 * @swagger
 * tags:
 *   name: Bookmark
 *   description: Operations related to bookmarks
 */

const express = require("express");
const {
  bookmarkByUser,
  getTotalBookmarksByUser,
  getBookmarkByUser,
} = require("../controllers/bookmark.controllers");

const route = express.Router();
/**
 * @swagger
 *
 * /bookmark/user/{id}:
 *   post:
 *     summary: Add a bookmark for a user
 *     description: Add a bookmark for a specific user
 *     tags: [Bookmark]
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
 *               bookID:
 *                 type: string
 *                 format: uuid
 *               videoID:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       '200':
 *         description: Bookmark added successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
route.post("/user/:id", bookmarkByUser);
/**
 * @swagger
 *
 * /bookmark/user/total-bookmark/{id}:
 *   get:
 *     summary: Get total bookmarks for a user
 *     description: Retrieve the total number of bookmarks for a specific user
 *     tags: [Bookmark]
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
 *                 totalBookmarks:
 *                   type: number
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
route.get("/user/total-bookmark/:id", getTotalBookmarksByUser);
/**
 * @swagger
 *
 * /bookmark/user/data-bookmark/{id}:
 *   get:
 *     summary: Get bookmarks for a user
 *     description: Retrieve bookmarks for a specific user
 *     tags: [Bookmark]
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bookmark'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
route.get("/user/data-bookmark/:id", getBookmarkByUser);
module.exports = route;
