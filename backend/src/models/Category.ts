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

categorySchema.index(
  { updatedAt: 1 },
  { expireAfterSeconds: 259200, partialFilterExpression: { activeuser: false } }
);

export default mongoose.model<Category>("Category", categorySchema);
