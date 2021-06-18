import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userid: { type: mongoose.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  status: { type: Number, required: true },
  completionTime: { type: Date, required: true },
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);