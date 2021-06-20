import mongoose from "mongoose";

interface User {
  username: String;
  password: String;
  tel: String;
  email: String;
  subusers: [mongoose.Schema.Types.ObjectId];
}

const UserSchema = new mongoose.Schema<User>(
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

export default mongoose.model<User>("User", UserSchema);
