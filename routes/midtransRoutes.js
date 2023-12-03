/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         order_id:
 *           type: string
 *           description: Order ID for the transaction
 *         donaturId:
 *           type: string
 *           format: uuid
 *           description: Donatur ID associated with the transaction
 *         full_name:
 *           type: string
 *           description: Full name of the donor
 *         email:
 *           type: string
 *           description: Email of the donor
 *         phone:
 *           type: string
 *           description: Phone number of the donor
 *         donation_amount:
 *           type: number
 *           description: Amount of the donation
 *         note:
 *           type: string
 *           description: Additional notes for the transaction
 *         response_midtrans:
 *           type: string
 *           description: Response from Midtrans payment gateway
 *         transaction_status:
 *           type: string
 *           description: Status of the transaction
 *         previous_transaction_id:
 *           type: string
 *           description: Previous transaction ID (if any)
 *         last_updated_at:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp of the transaction
 */

/**
 * @swagger
 * tags:
 *   name: Midtrans
 *   description: Midtrans payment operations
 */
const express = require("express");
const router = express.Router();
const controller = require("../controllers/midtrans.controllers.js");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept, Authorization"
  );
  next();
});
/**
 * @swagger
 *
 * /midtrans:
 *   post:
 *     summary: Charge a transaction using Midtrans
 *     description: Charge a transaction using Midtrans payment gateway
 *     tags: [Midtrans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               order_id:
 *                 type: string
 *               donaturId:
 *                 type: string
 *               full_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               donation_amount:
 *                 type: number
 *               note:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Transaction charged successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/", controller.midtransChargeTransaction);
/**
 * @swagger
 *
 * /midtrans/config:
 *   get:
 *     summary: Get Midtrans client configuration
 *     description: Retrieve the client configuration for Midtrans
 *     tags: [Midtrans]
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientKey:
 *                   type: string
 */
router.get("/config", (req, res) => {
  res.json({
    clientKey: process.env.CLIENT_KEY,
  });
});
/**
 * @swagger
 *
 * /midtrans/status/{order_id}:
 *   get:
 *     summary: Get transaction status from Midtrans
 *     description: Retrieve the transaction status from Midtrans payment gateway
 *     tags: [Midtrans]
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         description: Order ID for the transaction
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
 *                 transaction_status:
 *                   type: string
 *       '404':
 *         description: Transaction not found
 *       '500':
 *         description: Internal server error
 */
router.get("/status/:order_id", controller.getTransactionStatus);

module.exports = router;
