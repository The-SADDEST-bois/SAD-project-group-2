import type { IModule, ISession } from "../../types/types";
import api from "../config/apiconfig";
import headerAuthorisationWithParams from "../../src/utils/headerAuthorization/headerAuthorisationWithParams";

interface IData {
  tutorId?: string;
  moduleName?: string;
}

export const getAllModulesByTutor = async (tutorId: string) => {
  try {
    return await api.get<IModule[]>(
      "/tutor/allModules",
      headerAuthorisationWithParams({ tutorId: tutorId })
    );
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};

export const getAllSessionsPerModule = async (moduleName: string) => {
  try {
    return await api.get<ISession[]>(
      "/tutor/sessionsPerModule",
      headerAuthorisationWithParams({ moduleName: moduleName })
    );
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};

export const getOverallModuleAttendance = async (moduleName: string) => {
  try {
    return await api.get<ISession[]>(
      "/tutor/overallModuleAttendance",
      headerAuthorisationWithParams({ moduleName: moduleName })
    );
  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};
