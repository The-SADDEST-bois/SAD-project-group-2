import express from "express";
import StatusCode from "../Utils/StatusCodes";
import { IsModuleLeaderRole, isEvalatedRole } from "../Utils/CheckRole";
import Modules from "../Models/Module";
import Sessions from "../Models/Session";

const moduleLeaderController = express.Router();

moduleLeaderController.get("/allModules", (request: any, response: any) => {
  if (!isEvalatedRole(request)) {
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  }
  const moduleLeaderId = request.query.moduleLeaderId;
  Modules.find(
    { "moduleLeader.moduleLeaderId": moduleLeaderId },
    (err: any, document: any) => {
      if (err) {
        console.log("Error getting modules: ", err);
        return response
          .status(err.status || StatusCode.BAD_REQUEST)
          .json({ error: "Error getting modules", message: err });
      }
      return response.status(StatusCode.OK).json(document);
    }
  );
});

moduleLeaderController.get(
  "/overallModuleAttendance",
  async (request: any, response: any) => {
    if (!IsModuleLeaderRole(request)) {
      return response.status(StatusCode.FORBIDDEN).json({
        error: "Forbidden",
        message: "You are do not have the correct privileges for this request",
      });
    }
    try {
      const moduleName = request.query.moduleName;
      const attendanceFromAllSessions = await Sessions.find({
        moduleName: moduleName,
      }).select("attendance");
      const numberOfStudents = attendanceFromAllSessions.length;
      const numberOfAttended = await Sessions.count({
        "attendance.status": 1,
      });
      const overallAttendancePercentage = (
        (numberOfAttended / numberOfStudents) *
        100
      ).toFixed(2);
      return response.status(StatusCode.OK).json({
        overallAttendancePercentage: overallAttendancePercentage,
      });
    } catch (error) {
      return response.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
        message: "Error getting overall module attendance",
      });
    }
  }
);

moduleLeaderController.get(
  "/overallCohortAttendance",
  async (request: any, response: any) => {
    if (!IsModuleLeaderRole(request)) {
      return response.status(StatusCode.FORBIDDEN).json({
        error: "Forbidden",
        message: "You are do not have the correct privileges for this request",
      });
    }
    try {
      const cohorts = request.query.cohortNames;
      var allAttendance: any[] = [];
      cohorts.forEach(async (cohort: any) => {
        allAttendance.push(
          await Sessions.find({
            cohort: cohort,
          })
        );
      });
      const numberOfStudents = allAttendance.length;
      const numberOfAttended = allAttendance.filter(
        (attendance: any) => attendance.status === 1
      ).length;

      const overallAttendancePercentage = (
        (numberOfAttended / numberOfStudents) *
        100
      ).toFixed(2);
      return response.status(StatusCode.OK).json({
        overallAttendancePercentage: overallAttendancePercentage,
      });
    } catch (error) {
      return response.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
        message: "Error getting overall cohort attendance",
      });
    }
  }
);

moduleLeaderController.delete(
  "/deleteSession",
  (request: any, response: any) => {
    if (!IsModuleLeaderRole(request)) {
      return response.status(StatusCode.FORBIDDEN).json({
        error: "Forbidden",
        message: "You are do not have the correct privileges for this request",
      });
    }
    const sessionId = request.query.sessionId;
    Sessions.deleteOne({ _id: sessionId }, (err: any, document: any) => {
      if (err) {
        return response
          .status(err.status || StatusCode.BAD_REQUEST)
          .json({ error: "Error deleting session", message: err });
      }
      return response.status(StatusCode.OK).json(document);
    });
  }
);

export default moduleLeaderController;
