import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  orderid: { type: Number, required: true },
  productid: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status: { type: Boolean, required: true },
  paymentStatus: { type: Boolean, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
});

module.exports = mongoose.model("Request", requestSchema);