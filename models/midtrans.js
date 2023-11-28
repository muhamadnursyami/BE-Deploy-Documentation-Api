const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  order_id: {
    type: String,  
    required: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  donation_amount: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
  },
  response_midtrans: {
    type: String,
  },
  transaction_status: {
    type: String,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);