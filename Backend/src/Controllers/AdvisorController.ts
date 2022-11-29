import express from "express";
import StatusCode from "../Utils/StatusCodes";
import AcademicAdvisors from "../Models/AcademicAdvisor";
import { IsAdvisorRole } from "../Utils/CheckRole";
import Sessions from "../Models/Session";

const advisorController = express.Router();

advisorController.get("/adviseesByAdvisorId", (request: any, response: any) => {
  if (!IsAdvisorRole(request)) {
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You are do not have the correct privileges for this request",
    });
  }
  const advisorId = request.query.advisorId;

  var GetAdviseesQuery = AcademicAdvisors.find({
    advisorId: advisorId,
  }).select("advisees");

  GetAdviseesQuery.exec((err: any, document: any) => {
    if (err) {
      return response
        .status(err.status || StatusCode.BAD_REQUEST)
        .json({ error: "Error getting advisees", message: err });
    }
    console.log(document);
    return response.status(StatusCode.OK).json(document);
  });
});

advisorController.get(
  "/overallAdviseeAttendance",
  async (request: any, response: any) => {
    if (!IsAdvisorRole(request)) {
      return response.status(StatusCode.FORBIDDEN).json({
        error: "Forbidden",
        message: "You are do not have the correct privileges for this request",
      });
    }
    const adviseeId = request.query.adviseeId;
    var attendanceFromAdviseeSessions = await Sessions.find({
      "attendance.studentId": adviseeId,
    }).select("attendance");

    var numberOfSessions = attendanceFromAdviseeSessions.length;
    var numberOfSessionsAttended = 0;
    attendanceFromAdviseeSessions.forEach((session: any) => {
      session.attendance.forEach((attendance: any) => {
        if (attendance.studentId == adviseeId && attendance.status == 1) {
          numberOfSessionsAttended++;
        }
      });
    });

    var overallAttendance = numberOfSessionsAttended / numberOfSessions;

    return response.status(StatusCode.OK).json({
      overallAttendance: overallAttendance,
    });
  }
);

advisorController.get(
  "/adviseeAttendanceByModule",
  async (request: any, response: any) => {
    if (!IsAdvisorRole(request)) {
      return response.status(StatusCode.FORBIDDEN).json({
        error: "Forbidden",
        message: "You are do not have the correct privileges for this request",
      });
    }
    const adviseeId = request.query.adviseeId;
    const moduleName = request.query.moduleName;
    var attendanceFromAdviseeSessions = await Sessions.find({
      "attendance.studentId": adviseeId,
      moduleName: moduleName,
    }).select("attendance");

    var numberOfSessions = attendanceFromAdviseeSessions.length;
    var numberOfSessionsAttended = 0;

    attendanceFromAdviseeSessions.forEach((session: any) => {
      session.attendance.forEach((attendance: any) => {
        if (attendance.studentId == adviseeId && attendance.status == 1) {
          numberOfSessionsAttended++;
        }
      });
    });

    var overallAttendance = numberOfSessionsAttended / numberOfSessions;
    return response.status(StatusCode.OK).json({
      overallAttendance: overallAttendance,
    });
  }
);

export default advisorController;
