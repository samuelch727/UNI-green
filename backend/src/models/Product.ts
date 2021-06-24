import mongoose from "mongoose";

interface Product {
  schoolid: mongoose.Types.ObjectId;
  categoryid: mongoose.Types.ObjectId;
  stock: Number;
  available: Boolean;
  imgUrl: [String];
  size: String;
  price: mongoose.Types.Decimal128;
  producttype: [ProductType];
}

interface ProductType {
  type: String;
  name: String;
}

const productTypeSchema = new mongoose.Schema({
  type: { type: String },
  name: { type: String },
});

const productSchema = new mongoose.Schema({
  schoolid: { type: mongoose.Types.ObjectId, required: true, ref: "School" },
  categoryid: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  stock: { type: Number, required: true },
  available: { type: Boolean, required: true },
  imgUrl: [{ type: String, required: true }],
  size: { type: String, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
  producttype: { type: productTypeSchema },
});

export default mongoose.model<Product>("Product", productSchema);
