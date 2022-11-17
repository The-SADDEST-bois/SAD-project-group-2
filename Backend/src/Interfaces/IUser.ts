import { Roles } from "../Types/Roles";

export interface IUser {
  email: string;
  password: string;
  role: Roles;
  name?: string;
}
