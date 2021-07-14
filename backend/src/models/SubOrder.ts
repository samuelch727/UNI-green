import mongoose from "mongoose";

interface SubOrder {
  userid: mongoose.Schema.Types.ObjectId;
  quantity: Number;
  productType: productType;
  status: Boolean;
  completionTime: Date;
}

interface productType {
  type: String;
  name: String;
}

const productTypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
});

const subOrderSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  quantity: { type: Number, required: true },
  productType: { type: productTypeSchema, required: true },
  status: { type: Boolean, required: true },
  completionTime: { type: Date, required: true },
});

export default mongoose.model<SubOrder>("SubOrder", subOrderSchema);
