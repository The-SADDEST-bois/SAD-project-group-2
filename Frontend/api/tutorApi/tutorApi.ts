import type { IModule } from "../../types/types";
import api from "../config/apiconfig";
import headerAuthorisationWithParams from "../../src/utils/headerAuthorization/headerAuthorisationWithParams";

export const getAllModulesByTutor = async (tutorId: string) => {
  const response = await api.get<IModule[]>(
    "/tutor/allModules",
    headerAuthorisationWithParams("tutorId", tutorId)
  );
  return response;
};
