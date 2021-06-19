import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  tel: { type: String, required: true },
  email: { type: String, required: true },
});

mongoose.model("User", UserSchema);
