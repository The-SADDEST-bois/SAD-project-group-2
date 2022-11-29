import express from "express";
import StatusCode from "../Utils/StatusCodes";
import { IsAdvisorRole } from "../Utils/CheckRole";
import { AdviseesByAdvisor, OverallAdviseeAttendance, AdviseeAttendanceByModule } from "../Services/AdvisorServices";

const advisorController = express.Router();

advisorController.get("/adviseesByAdvisorId", (request: any, response: any) => {
  if (!IsAdvisorRole(request)) {
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You are do not have the correct privileges for this request",
    });
  }

  return AdviseesByAdvisor(request, response);

});

advisorController.get("/overallAdviseeAttendance", async (request: any, response: any) => {
    if (!IsAdvisorRole(request)) {
      return response.status(StatusCode.FORBIDDEN).json({
        error: "Forbidden",
        message: "You are do not have the correct privileges for this request",
      });
    }
    
    return await OverallAdviseeAttendance(request, response);

  });

advisorController.get("/adviseeAttendanceByModule", async (request: any, response: any) => {
    if (!IsAdvisorRole(request)) {
      return response.status(StatusCode.FORBIDDEN).json({
        error: "Forbidden",
        message: "You are do not have the correct privileges for this request",
      });
    }

    return await AdviseeAttendanceByModule(request, response);

  });

export default advisorController;
