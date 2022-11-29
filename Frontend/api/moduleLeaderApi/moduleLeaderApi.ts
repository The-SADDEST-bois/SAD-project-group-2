import type { IModule, ISession } from "../../types/types";
import api from "../config/apiconfig";
import headerAuthorisationWithParams from "../../src/utils/headerAuthorization/headerAuthorisationWithParams";

export const getAllModulesByModuleLeader = async (moduleLeaderId: string) => {
  try {
    return await api.get<IModule[]>(
      "/moduleLeader/allModules",
      headerAuthorisationWithParams({ moduleLeaderId: moduleLeaderId })
    );
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};

export const getOverallModuleAttendance = async (moduleName: string) => {
  try {
    return await api.get(
      "/moduleLeader/overallModuleAttendance",
      headerAuthorisationWithParams({ moduleName: moduleName })
    );
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};

export const getOverallCohortAttendance = async (
  cohortName: string,
  moduleName: string
) => {
  try {
    return await api.get(
      "/moduleLeader/overallCohortAttendance",
      headerAuthorisationWithParams({
        cohortName: cohortName,
        moduleName: moduleName,
      })
    );
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};

export const deleteSession = async (sessionId: string) => {
  try {
    return await api.delete(
      "/moduleLeader/deleteSession",
      headerAuthorisationWithParams({ sessionId: sessionId })
    );
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};
