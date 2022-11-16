import { Roles } from "../Utils/Roles";

export interface IUser {
  email: string;
  password: string;
  role: Roles;
  name?: string;
}
