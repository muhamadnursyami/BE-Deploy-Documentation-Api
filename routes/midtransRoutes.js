const express = require('express');
const router = express.Router();
const controller = require("../controllers/midtrans.controllers.js");

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept, Authorization"
  );
  next();
});

router.post("/", controller.midtransChargeTransaction);

module.exports = router;