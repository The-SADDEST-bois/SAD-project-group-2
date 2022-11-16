import { Roles } from "../Utils/Roles";
import { Schema } from "mongoose";

export interface IUser {
  _id?: Schema.Types.ObjectId;
  email: string;
  password: string;
  role: Roles;
  name?: string;
}
