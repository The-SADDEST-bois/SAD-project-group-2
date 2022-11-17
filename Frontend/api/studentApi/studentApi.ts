import type { IUser } from "../../types/types";
import api from "../config/apiconfig";

export async function GetAllStudents() {
  const response = await api.get<IUser[]>("/student/all");
  console.log(response);
  return response;
}
