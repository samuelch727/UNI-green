import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discription: { type: String, required: true },
  iconUrl: { type: String },
  address: { type: String, required: true },
  tel: { type: String, required: true },
});

module.exports = mongoose.model("School", SchoolSchema);
