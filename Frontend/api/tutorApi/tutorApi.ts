import type { IModule, ISession } from "../../types/types";
import api from "../config/apiconfig";
import headerAuthorisationWithParams from "../../src/utils/headerAuthorization/headerAuthorisationWithParams";

interface IData {
  tutorId?: string;
  moduleName?: string;
}

export const getAllModulesByTutor = async (tutorId: string) => {
  const response = await api.get<IModule[]>(
    "/tutor/allModules",
    headerAuthorisationWithParams(tutorId)
  );
  return response;
};

export const getAllSessionsPerModule = async (moduleName: string) => {
  const response = await api.get<ISession[]>(
    "/tutor/sessionsPerModule",
    headerAuthorisationWithParams(moduleName)
  );
  console.log(response);
  return response;
};
