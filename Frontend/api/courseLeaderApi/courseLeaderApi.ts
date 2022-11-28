import type { ICourse } from "../../types/types";
import api from "../config/apiconfig";
import headerAuthorisationWithParams from "../../src/utils/headerAuthorization/headerAuthorisationWithParams";

export const getAllCoursesByCourseLeader = async (courseLeaderId: string) => {
    try {
      return await api.get<ICourse[]>(
        "/courseLeader/allCourses",
        headerAuthorisationWithParams({courseLeaderId: courseLeaderId})
      ); 
    } catch (error: any) {
      console.log(error);
      return error.response;
    }
  };