const db = require("../config/db");
const Transaksi = db.transaksi;
const { coreApi } = require("../utils/midtrans");
const midtransClient = require("midtrans-client");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Donation = require("../models/midtrans");

// Controller untuk menangani charge transaksi menggunakan Midtrans
exports.midtransChargeTransaction = async (req, res) => {
  try {
    // Mengambil data dari body request
    const { full_name, email, phone, donation_amount, note } = req.body;

    // Memastikan tidak ada field yang kosong dalam request
    if (!full_name || !email || !phone || !donation_amount) {
      return res.status(400).json({
        success: false,
        message: "Terdapat kolom yang kosong dalam permintaan.",
      });
    }

    // Membuat objek data donasi untuk disimpan di MongoDB
    const donationData = new Donation({
      order_id: new ObjectId(), // Membuat ObjectId baru untuk order_id
      full_name,
      email,
      phone,
      donation_amount,
      note,
    });

    // Menyimpan data donasi ke MongoDB
    const savedDonation = await donationData.save();
    console.log("Berhasil menyimpan data donasi:", savedDonation);

    // Menyiapkan konfigurasi dan parameter untuk charge transaksi ke Midtrans
    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: donationData.order_id.toString(), // Mengubah ObjectId menjadi string
        gross_amount: donation_amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: full_name,
        email,
        phone,
      },
    };

    // Melakukan charge transaksi ke server Midtrans
    snap.createTransaction(parameter).then(async (transaction) => {
      // Menyimpan response_midtrans dan transaction_status ke objek donasi
      donationData.response_midtrans = transaction.token;
      donationData.transaction_status = transaction.transaction_status;

      // Menyimpan data donasi ke MongoDB
      const savedDonation = await donationData.save();

      return res.status(201).json({
        success: true,
        message: "Berhasil melakukan charge transaksi!",
        data: transaction,
      });
    });
  } catch (error) {
    // Menangani kesalahan dan memberikan respons server error
    return res.status(500).json({ success: false, message: error.message });
  }
};
