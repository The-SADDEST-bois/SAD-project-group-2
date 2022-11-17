import { Roles } from "../Types/Roles";

export interface IUser {
  _id?: Schema.Types.ObjectId;
  email: string;
  password: string;
  role: Roles;
  name?: string;
}
