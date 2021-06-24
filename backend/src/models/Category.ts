import mongoose from "mongoose";

interface Category {
  name: String;
  description: String;
  available: String;
}

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  available: { type: String, required: true },
});

export default mongoose.model<Category>("Category", categorySchema);
