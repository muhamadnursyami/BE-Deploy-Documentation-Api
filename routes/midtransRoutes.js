module.exports = (app) => {
  const controller = require("../controllers/midtrans.controllers.js");

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept, Authorization"
    );
    next();
  });

  app.post("/", controller.midtransChargeTransaction);
};