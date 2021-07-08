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
//TODO: add keyword for searching

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  available: { type: Boolean, required: true, index: true },
  availabletopublic: { type: Boolean, required: true, index: true },
  availabletograd: { type: Boolean, required: true, index: true },
  producttype: [{ type: String }],
  productid: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Product" },
  ],
  schoolid: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "School",
    index: true,
  },
});

export default mongoose.model<Category>("Category", categorySchema);
