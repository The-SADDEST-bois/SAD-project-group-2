import headerAuthorisationWithParams from "../../src/utils/headerAuthorization/headerAuthorisationWithParams";
import api from "../config/apiconfig";

export const getOverallAdviseeAttendance = async (advisorId: string) => {
  try {
    return await api.get(
      "/advisor/overallAdviseeAttendance",
      headerAuthorisationWithParams({ advisorId: advisorId })
    );
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};

export const getAdviseesByAdvisorId = async (advisorId: string) => {
  try {
    return await api.get(
      "/advisor/adviseesByAdvisorId",
      headerAuthorisationWithParams({ advisorId: advisorId })
    );
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};
