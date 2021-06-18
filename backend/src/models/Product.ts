import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  schoolid: { type: Number, required: true },
  categoryid: { type: Number, required: true },
  stock: { type: Number, required: true },
  available: { type: Boolean, required: true },
  imgUrl: { type:[String], required: true },
  size: { type: String, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);