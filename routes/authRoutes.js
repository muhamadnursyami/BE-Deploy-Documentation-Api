/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication operations
 */
const express = require("express");
const {
  register,
  login,
  resetPassword,
  loginAdmin,
  registerAdmin,
} = require("../controllers/auth.controllers");
const route = express.Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided credentials
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *               jenisKelamin:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Registration successful
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
route.post("/register", register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user with provided credentials
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *       '500':
 *         description: Internal server error
 */
route.post("/login", login);
/**
 * @swagger
 * /auth/reset-password:
 *   put:
 *     summary: Reset user password
 *     description: Reset user password with a new one
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password reset successful
 *       '401':
 *         description: Unauthorized - Invalid email
 *       '500':
 *         description: Internal server error
 */
route.put("/reset-password", resetPassword);
// route.post("/cms/register", registerAdmin);
// route.post("/cms/login", loginAdmin);

module.exports = route;
