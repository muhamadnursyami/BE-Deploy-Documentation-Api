const mongoose = require('mongoose');

const transaksiSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  response_midtrans: {
    type: String,
  },
  transaction_status: {
    type: String,
  },
});

module.exports = mongoose.model('Transaksi', transaksiSchema);

// module.exports = mongoose.model("User", userSchema);