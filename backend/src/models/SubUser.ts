import mongoose from "mongoose";

interface SubUser {
  userid: mongoose.Schema.Types.ObjectId;
  schoolid: mongoose.Schema.Types.ObjectId;
  verify: Boolean;
  name: String;
  sid: String;
  activeuser: Boolean;
  graddate: Date;
  admin: Boolean;
  schooladmin: Boolean;
  schooluser: Boolean;
}

const subUserSchema = new mongoose.Schema({
  userid: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  schoolid: { type: mongoose.Types.ObjectId, required: true, ref: "School" },
  verify: { type: Boolean, required: true },
  name: { type: String, required: true },
  sid: { type: String, required: true },
  activeuser: { type: Boolean, require: true },
  graddate: { type: Date },
  admin: { type: Boolean, required: true, default: false },
  schooladmin: { type: Boolean, required: true, default: false },
  schooluser: { type: Boolean, required: true, default: false },
});

subUserSchema.index(
  { updatedAt: 1 },
  { expireAfterSeconds: 259200, partialFilterExpression: { activeuser: false } }
);

export default mongoose.model<SubUser>("SubUser", subUserSchema);
