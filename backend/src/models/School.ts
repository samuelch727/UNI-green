import mongoose from "mongoose";

interface School {
  name: String;
  description: String;
  iconUrl: String;
  address: String;
  tel: String;
  categoryid: [mongoose.Types.ObjectId];
}

const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  iconUrl: { type: String },
  address: { type: String, required: true },
  tel: { type: String, required: true },
  categoryid: [{ type: mongoose.Types.ObjectId }],
});

export default mongoose.model<School>("School", SchoolSchema);
