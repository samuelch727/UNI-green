import mongoose from "mongoose";

interface Request {
  orderid: mongoose.Types.ObjectId;
  productid: mongoose.Types.ObjectId;
  quantity: Number;
  status: Boolean;
  paymentStatus: Boolean;
  price: mongoose.Types.Decimal128;
}

const requestSchema = new mongoose.Schema({
  orderid: { type: mongoose.Types.ObjectId, required: true, ref: "Order" },
  productid: { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
  quantity: { type: Number, required: true },
  status: { type: Boolean, required: true },
  paymentStatus: { type: Boolean, required: true },
  price: { type: mongoose.Types.Decimal128, required: true },
});

export default mongoose.model<Request>("Request", requestSchema);
