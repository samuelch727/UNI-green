import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  schoolid: { type: mongoose.Types.ObjectId, required: true },
  categoryid: { type: mongoose.Types.ObjectId, required: true },
  stock: { type: Number, required: true },
  available: { type: Boolean, required: true },
  imgUrl: { type:[String], required: true },
  size: { type: String, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model("Product", productSchema);