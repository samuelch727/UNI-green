import mongoose from "mongoose";

interface Order {
  userid: mongoose.Types.ObjectId;
  subOrderid: [mongoose.Types.ObjectId];
  status: Number;
  completionTime: Date;
}

const orderSchema = new mongoose.Schema(
  {
    userid: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    subOrderid: [
      { type: mongoose.Types.ObjectId, required: true, ref: "SubOrder" },
    ],
    quantity: { type: Number, required: true },
    status: { type: Number, required: true },
    completionTime: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Order>("Order", orderSchema);
