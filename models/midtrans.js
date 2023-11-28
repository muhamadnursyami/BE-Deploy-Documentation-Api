// model-mongoose.js
const mongoose = require('mongoose');

const transaksiSchema = new mongoose.Schema({
  order_id: String,
  nama: String,
  response_midtrans: String,
  transaction_status: String,
});

const TransaksiMongoose = mongoose.model('Transaksi', transaksiSchema);

module.exports = TransaksiMongoose;