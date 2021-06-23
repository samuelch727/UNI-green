import mongoose from "mongoose";

interface Order {
  userid: mongoose.Types.ObjectId;
  quantity: Number;
  status: Number;
  completionTime: Date;
}

const orderSchema = new mongoose.Schema(
  {
    userid: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    quantity: { type: Number, required: true },
    status: { type: Number, required: true },
    completionTime: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

orderSchema.index(
  { updatedAt: 1 },
  { expireAfterSeconds: 259200, partialFilterExpression: { activeuser: false } }
);

export default mongoose.model<Order>("Order", orderSchema);
