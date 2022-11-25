import type { IModule, ISession } from "../../types/types";
import api from "../config/apiconfig";
import headerAuthorisationWithParams from "../../src/utils/headerAuthorization/headerAuthorisationWithParams";

export const getAllModulesByTutor = async (tutorId: string) => {
  const response = await api.get<IModule[]>(
    "/tutor/allModules",
    headerAuthorisationWithParams("tutorId", tutorId)
  );
  return response;
};

interface IData {
    tutorId?: string;
    moduleName?: string;
  }

export const getAllModulesByTutor = async (data: IData) => {
  const response = await api.get<IModule[]>("/tutor/allModules", headerAuthorisationWithParams("tutorId", data.tutorId));
  console.log(response);
  return response;
}

export const getAllSessionsPerModule = async (data: IData) => {
  const response = await api.get<ISession[]>("/tutor/sessionsPerModule", headerAuthorisationWithParams("moduleName", data.moduleName));
  console.log(response);
  return response;
}

