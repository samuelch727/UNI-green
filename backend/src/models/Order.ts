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
    status: { type: Number, required: true },
    completionTime: { type: Date },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Order>("Order", orderSchema);
