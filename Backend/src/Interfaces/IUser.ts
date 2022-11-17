import { Roles } from "../Types/Roles";
import { Schema } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  role: Roles;
  name?: string;
  _id?: Schema.Types.ObjectId;
}
