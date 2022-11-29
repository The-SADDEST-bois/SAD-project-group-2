import express from "express";
import StatusCode from "../Utils/StatusCodes";
import { GetModulesByTutor, GetSessionsByModule, GetSessionsByModuleBetweenDateRange } from "../Services/TutorServices";
import {
  IsTutorRole,
  isEvalatedRole,
} from "../Utils/CheckRole";

const tutorController = express.Router();

tutorController.get("/allModules", (request: any, response: any) => {
  if (!isEvalatedRole(request)) {
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  }

  return GetModulesByTutor(request, response);

});

tutorController.get("/sessionsPerModule", (request: any, response: any) => {
  if (!IsTutorRole(request)) {
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  }

  return GetSessionsByModule(request, response);

});

tutorController.get("/sessionsPerModuleBetweenDateRange", async (request: any, response: any) => {
  console.log("request", request.query);
  if (!IsTutorRole(request)){
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  }

  return await GetSessionsByModuleBetweenDateRange(request, response);

});
export default tutorController;
