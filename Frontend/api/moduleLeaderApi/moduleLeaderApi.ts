import type { IModule, ISession } from "../../types/types";
import api from "../config/apiconfig";
import headerAuthorisationWithParams from "../../src/utils/headerAuthorization/headerAuthorisationWithParams";

export const getAllModulesByModuleLeader = async (moduleLeaderId: string) => {
    try {
      return await api.get<IModule[]>(
        "/moduleLeader/allModules",
        headerAuthorisationWithParams({moduleLeaderId: moduleLeaderId})
      ); 
    } catch (error: any) {
      console.log(error);
      return error.response;
    }
  };