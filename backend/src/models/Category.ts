import mongoose from "mongoose";

interface Category {
  name: String;
  description: String;
  available: Boolean;
  producttype: [String];
  availabletopublic: Boolean;
  availabletograd: Boolean;
  productid: [mongoose.Types.ObjectId];
  schoolid: mongoose.Types.ObjectId;
}

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  available: { type: Boolean, required: true },
  availabletopublic: { type: Boolean, required: true },
  availabletograd: { type: Boolean, required: true },
  producttype: [{ type: String }],
  productid: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
  ],
  schoolid: { type: mongoose.Types.ObjectId, required: true, ref: "School" },
});

export default mongoose.model<Category>("Category", categorySchema);
