import type { IModule } from "../../types/types";
import api from "../config/apiconfig";
import headerAuthorisationWithParams from "../../src/utils/headerAuthorization/headerAuthorisationWithParams";

interface IData {
    tutorId: string;
  }

export const getAllModulesByTutor = async (data: IData) => {
  const response = await api.get<IModule[]>("/tutor/allModules", headerAuthorisationWithParams("tutorId", data.tutorId));
  console.log(response);
  return response;
}