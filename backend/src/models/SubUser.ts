import mongoose from "mongoose";

const subUserSchema = new mongoose.Schema({
  userid: { type: mongoose.Types.ObjectId, required: true },
  schoolid: { type: mongoose.Types.ObjectId, required: true },
  permissionLevel: { type: Number, required: true },
  verify: { type: Boolean, required: true },
  name: { type: String, required: true },
  sid: { type: String, required: true },
});

module.exports = mongoose.model("SubUser", subUserSchema);
