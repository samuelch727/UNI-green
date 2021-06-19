import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    password: { type: String, required: true },
    tel: { type: String, required: true },
    email: {
      type: String,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "is invalid"],
      index: true,
    },
    subUserId: [{ type: mongoose.Types.ObjectId, ref: "SubUser" }],
  },
  { timestamps: true }
);

mongoose.model("User", UserSchema);
