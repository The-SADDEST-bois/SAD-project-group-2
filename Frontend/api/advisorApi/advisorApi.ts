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

export const getAdviseesByAdvisorId = async (adviseeId: string) => {
  try {
    return await api.get(
      "/advisor/adviseesByAdvisorId",
      headerAuthorisationWithParams({ adviseeId: adviseeId })
    );
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};

export const getAdviseeAttendanceByModule = async (
  adviseeId: string,
  moduleName: string
) => {
  try {
    return await api.get(
      "/advisor/adviseeAttendanceByModule",
      headerAuthorisationWithParams({
        adviseeId: adviseeId,
        moduleName: moduleName,
      })
    );
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};
