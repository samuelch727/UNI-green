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
    subusers: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubUser" }],
  },
  { timestamps: true }
);

// UserSchema.methods.addSubUser = function (
//   userID: any,
//   subUserID: any,
//   cb: (res: boolean) => void
// ) {
//   console.log("adding subuser");
//   //@ts-ignore
//   console.log("Found user with name: " + this.username);

//   try {
//     this.update(
//       {_id: userID},
//       {$push:{subUserID}},
//       done
//     )
//   }
// };

mongoose.model("User", UserSchema);
