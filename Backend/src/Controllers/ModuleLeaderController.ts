import express from "express";
import StatusCode from "../Utils/StatusCodes";
import { IsModuleLeaderRole, HighPriviledgesRole } from "../Utils/CheckRole";
import { ModulesByModuleLeader, OverallModuleAttendance, OverallCohortAttendance, DeleteSession } from "../Services/ModuleLeaderServices";

const moduleLeaderController = express.Router();

moduleLeaderController.get("/allModules", (request: any, response: any) => {
  if (!HighPriviledgesRole(request)) {
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  }

  return ModulesByModuleLeader(request, response);

});

moduleLeaderController.get("/overallModuleAttendance", async (request: any, response: any) => {
    if (!IsModuleLeaderRole(request)) {
      return response.status(StatusCode.FORBIDDEN).json({
        error: "Forbidden",
        message: "You do not have the correct privileges for this request",
      });
    }

    return await OverallModuleAttendance(request, response);

  });

moduleLeaderController.get("/overallCohortAttendance", async (request: any, response: any) => {
    if (!IsModuleLeaderRole(request)) {
      return response.status(StatusCode.FORBIDDEN).json({
        error: "Forbidden",
        message: "You do not have the correct privileges for this request",
      });
    }

    return await OverallCohortAttendance(request, response);

  });

moduleLeaderController.delete("/deleteSession", (request: any, response: any) => {
    if (!IsModuleLeaderRole(request)) {
      return response.status(StatusCode.FORBIDDEN).json({
        error: "Forbidden",
        message: "You do not have the correct privileges for this request",
      });
    }

    return DeleteSession(request, response);

  });

export default moduleLeaderController;
