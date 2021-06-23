import mongoose from "mongoose";

interface SubUser {
  userid: mongoose.Schema.Types.ObjectId;
  schoolid: mongoose.Schema.Types.ObjectId;
  permissionLevel: Number;
  verify: Boolean;
  name: String;
  sid: String;
  activeuser: Boolean;
}

const subUserSchema = new mongoose.Schema({
  userid: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  schoolid: { type: mongoose.Types.ObjectId, required: true, ref: "School" },
  permissionLevel: { type: Number, required: true },
  verify: { type: Boolean, required: true },
  name: { type: String, required: true },
  sid: { type: String, required: true },
  activeuser: { type: Boolean, require: true },
});

subUserSchema.index(
  { updatedAt: 1 },
  { expireAfterSeconds: 259200, partialFilterExpression: { activeuser: false } }
);

export default mongoose.model<SubUser>("SubUser", subUserSchema);
