import type { IData, IUser } from "../../types/types";
import api from "../config/apiconfig";
import headerAuthorisation from "../../src/utils/headerAuthorization/headerAuthorisation";

export async function GetAllStudents() {
  const response = await api.get<IUser[]>("/student/all");
  console.log(response);
  return response;
}

export const registerAttendance = async (data: IData) => {
  try {
    return await api.post(
      `/student/registerAttendance`,
      data,
      headerAuthorisation()
    );
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};
