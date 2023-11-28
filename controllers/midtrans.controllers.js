const db = require("../models/index.js");
const Transaksi = db.transaksi;
const { coreApi } = require("../utils/midtrans");
const midtransClient = require("midtrans-client");

exports.midtransChargeTransaction = async (req, res) => {
  //   if (!req.body || Object.keys(req.body).length === 0) {
  //     return res.status(400).send({
  //       success: false,
  //       message: "Content can not be empty!",
  //     });
  //   }

  try {
    // lakukan charge transaksi ke server midtrans sesuai request
    // const chargeResponse = await coreApi.charge(req.body);

    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: Math.floor(10000 + Math.random() * 90000),
        gross_amount: 10000,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: "Dedy",
        last_name: "Lumbantobing",
        email: "dedy@example.com",
        phone: "08111222333",
      },
    };

    snap.createTransaction(parameter).then((transaction) => {
      // transaction token
      // let transactionToken = transaction.token;
      // console.log('transactionToken:',transactionToken);

      return res.status(201).json({
        success: true,
        message: "Berhasil melakukan charge transaction!",
        data: transaction,
      });
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
