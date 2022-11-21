import mongoose, { Schema } from "mongoose";
import { IUser } from "../Interfaces/IUser";

const userSchema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
});

const Users = mongoose.model("User", userSchema);

export default Users;