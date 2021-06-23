import mongoose from "mongoose";

interface School {
  name: String;
  discription: String;
  iconUrl: String;
  address: String;
  tel: String;
}

const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discription: { type: String, required: true },
  iconUrl: { type: String },
  address: { type: String, required: true },
  tel: { type: String, required: true },
});

SchoolSchema.index(
  { updatedAt: 1 },
  { expireAfterSeconds: 259200, partialFilterExpression: { activeuser: false } }
);

export default mongoose.model<School>("School", SchoolSchema);
