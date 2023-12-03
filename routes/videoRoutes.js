/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         author:
 *           type: string
 *         likes:
 *           type: string
 *           default: ""
 *         rating:
 *           type: string
 *           default: "⭐⭐⭐⭐⭐"
 *         category:
 *           type: string
 *         tanggal_upload:
 *           type: string
 *           format: date
 *         url_thumbnail:
 *           type: string
 *         url_video:
 *           type: string
 *         url_unduh:
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
 *   name: Video
 *   description: Video operations
 */
const express = require("express");
const {
  getVideoById,
  getAllVideo,
  deleteVideoById,
  deleteAllVideo,
} = require("../controllers/video.controllers");

const route = express.Router();
/**
 * @swagger
 * /videos:
 *   get:
 *     summary: Get all videos
 *     description: Retrieve a list of all videos
 *     tags: [Video]
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Video'
 *       '500':
 *         description: Internal server error
 */
route.get("/", getAllVideo);
/**
 * @swagger
 * /videos/{id}:
 *   get:
 *     summary: Get a video by ID
 *     description: Retrieve a video by its ID
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Video ID
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       '404':
 *         description: Video not found
 *       '500':
 *         description: Internal server error
 */
route.get("/:id", getVideoById);
/**
 * @swagger
 * /videos/{id}:
 *   delete:
 *     summary: Delete a video by ID
 *     description: Delete a video by its ID
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Video ID
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Video deleted successfully
 *       '404':
 *         description: Video not found
 *       '500':
 *         description: Internal server error
 */
route.delete("/:id", deleteVideoById);
/**
 * @swagger
 * /videos:
 *   delete:
 *     summary: Delete all videos
 *     description: Delete all videos
 *     tags: [Video]
 *     responses:
 *       '204':
 *         description: Videos deleted successfully
 *       '500':
 *         description: Internal server error
 */
route.delete("/", deleteAllVideo);

module.exports = route;
