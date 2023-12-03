/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         nama:
 *           type: string
 *         jenisKelamin:
 *           type: string
 *           enum: [pria, wanita]
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         profileImage:
 *           type: string
 *         noHp:
 *           type: string
 *         bio:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin]
 */

const express = require("express");
const {
  getAllUser,
  getUserById,
  editProfileImage,
  updateProfile,
  deleteUserById,
  deleteAllUser,
} = require("../controllers/user.controllers");

const route = express.Router();
const upload = require("../utils/multer");
const { verifyToken, authorizeRoles } = require("../middleware/auth");

/**
 * @swagger
 *
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Internal server error
 */
route.get("/", getAllUser);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user by their ID
 *     tags: [Users]
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
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
route.get("/:id", getUserById);
/**
 * @swagger
 * /users/edit-profile/{id}:
 *   put:
 *     summary: Edit Profile By User
 *     description: Retrieve a user by their ID
 *     tags: [Users]
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
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
route.put("/edit-profile/:id", upload.single("profileImage"), updateProfile);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete Profile By User
 *     description: Retrieve a user by their ID
 *     tags: [Users]
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
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
route.delete("/:id", deleteUserById);
/**
 * @swagger
 * /users/:
 *   delete:
 *     summary: Delete ALL  User
 *     description: Delete ALL User
 *     tags: [Users]
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
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
route.delete("/", deleteAllUser);

module.exports = route;
