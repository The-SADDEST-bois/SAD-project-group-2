import { Roles } from "../Types/Roles";

export interface ITokenData {
  data :{
    _id: string,
    role: Roles
  }
  iat: number,
  exp: number
}