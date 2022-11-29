import express from "express";
import StatusCode from "../Utils/StatusCodes";
import { ModulesByTutor, SessionsByModule, SessionsByModuleBetweenDateRange } from "../Services/TutorServices";
import {
  IsTutorRole,
  HighPriviledgesRole,
} from "../Utils/CheckRole";

const tutorController = express.Router();

tutorController.get("/allModules", (request: any, response: any) => {
  if (!HighPriviledgesRole(request)) {
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  }

  return ModulesByTutor(request, response);

});

tutorController.get("/sessionsPerModule", (request: any, response: any) => {
  if (!HighPriviledgesRole(request)) {
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  }

  return SessionsByModule(request, response);

});

tutorController.get("/sessionsPerModuleBetweenDateRange", async (request: any, response: any) => {
  console.log("request", request.query);
  if (!HighPriviledgesRole(request)){
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  }

  return await SessionsByModuleBetweenDateRange(request, response);

});
export default tutorController;
