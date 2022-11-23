import type { IUser } from "../../types/types";
import api from "../config/apiconfig";
import headerAuthorisation from "../../src/utils/headerAuthorization/headerAuthorisation";


export async function GetAllStudents() {
  const response = await api.get<IUser[]>("/student/all");
  console.log(response);
  return response;
}

interface IData {
  sessionCode: string;
  userId: string;
}

export const registerAttendance = async (data: IData) => {
  return await api.post(`/student/registerAttendance`, {
    data: {
    sessionCode: data.sessionCode,
    userId: data.userId
  }},
  headerAuthorisation() );
};