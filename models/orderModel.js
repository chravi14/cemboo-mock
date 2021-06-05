const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  paymentAddress: {
    required: true,
    type: String,
    unique: true,
  },
  amount: {
    type: String,
    required: true,
  },
  price: {
    required: true,
    type: String,
  },
  planId: {
    type: Number,
    required: true,
  },
});

const Order = new mongoose.model("order", orderSchema);

module.exports = Order;
