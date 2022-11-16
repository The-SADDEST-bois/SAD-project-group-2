import mongoose, { Schema } from "mongoose";
import { IUser } from "../Interfaces/IUser";

const userSchema = new Schema<IUser>({
  _id: { type: Schema.Types.ObjectId, required: true},
  name: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const Users = mongoose.model("User", userSchema);

export default Users;