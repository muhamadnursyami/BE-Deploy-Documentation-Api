const db = require("../config/db");
const Transaksi = db.transaksi;
const { coreApi } = require("../utils/midtrans");
const cron = require("node-cron");
const mongoose = require("mongoose");
const midtransClient = require("midtrans-client");
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
      transaction_id: null,
      response_midtrans: null,
      transaction_status: "Butuh update",
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
    const transaction = await snap.createTransaction(parameter);

    // Menyimpan Transaction ID ke objek donasi di MongoDB
    donationData.transaction_id = transaction.transaction_id;
    donationData.response_midtrans = JSON.stringify(transaction);
    await donationData.save();

    console.log("Transaction ID:", transaction.transaction_id);

    // Schedule cron job untuk memperbarui status transaksi setiap 10 menit
    cron.schedule('0 * * * *', async () => {
      try {
        console.log('Cron job is running...');
        const updatedTransactionStatus = await getTransactionStatusFromMidtrans(donationData.transaction_id);
        
        // Update donationData with the latest transaction status
        donationData.transaction_status = updatedTransactionStatus.status;
        // Update previous_transaction_id with the current transaction_id
        donationData.previous_transaction_id = donationData.transaction_id;
        // Update transaction_id with the latest transaction_id
        donationData.transaction_id = updatedTransactionStatus.transaction_id;
        // Update last_updated_at with the current timestamp
        let now = new Date();
        donationData.last_updated_at = now.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta', hour12: false });
        
        // Save updated donationData to MongoDB
        await donationData.save();
    
        console.log(`Transaction status updated: ${donationData.transaction_status}`);
      } catch (cronError) {
        console.error('Error updating transaction status:', cronError.message);
      }
    });
    

    return res.status(201).json({
      success: true,
      message: "Berhasil melakukan charge transaksi!",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Controller untuk mendapatkan status transaksi dari Midtrans
const getTransactionStatusFromMidtrans = async (order_id) => {
  return new Promise((resolve, reject) => {
    let core = new midtransClient.CoreApi({
      isProduction: false,
      serverKey: process.env.SERVER_KEY,
    });

    core.transaction.status(order_id).then((transactionStatus) => {
      resolve(transactionStatus);
    }).catch((error) => {
      reject(error);
    });
  });
};

exports.getTransactionStatus = async (req, res) => {
  try {
    const { order_id } = req.params;

    if (!order_id) {
      return res.status(400).json({
        success: false,
        message: "No order_id in the request.",
      });
    }

    const transactionStatus = await getTransactionStatusFromMidtrans(order_id);

    return res.status(200).json({
      success: true,
      message: "Transaction status retrieved successfully!",
      data: transactionStatus,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};