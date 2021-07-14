import mongoose from "mongoose";

interface Product {
  schoolid: mongoose.Types.ObjectId;
  categoryid: mongoose.Types.ObjectId;
  stock: Number;
  available: Boolean;
  imgUrl: [String];
  price: mongoose.Types.Decimal128;
  producttype: ProductType;
  name: String;
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
  schoolid: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "School",
    index: true,
  },
  categoryid: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Category",
    index: true,
  },
  stock: { type: Number, required: true },
  available: { type: Boolean, required: true },
  imgUrl: [{ type: String }],
  price: { type: mongoose.Types.Decimal128, required: true },
  producttype: { type: productTypeSchema },
  name: { type: String },
});

export default mongoose.model<Product>("Product", productSchema);
