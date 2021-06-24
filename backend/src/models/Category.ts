import mongoose from "mongoose";

interface Category {
  name: String;
  description: String;
  available: String;
  producttype: [String];
  productid: [mongoose.Types.ObjectId];
}

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  available: { type: String, required: true },
  producttype: [{ type: String }],
  productid: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
  ],
});

export default mongoose.model<Category>("Category", categorySchema);
