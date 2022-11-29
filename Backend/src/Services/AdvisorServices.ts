import AcademicAdvisors from "../Models/AcademicAdvisor";
import Sessions from "../Models/Session";
import StatusCode from "../Utils/StatusCodes";

export const AdviseesByAdvisor = (request: any, response: any) => {
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
};

export const OverallAdviseeAttendance = async (request: any, response: any) => {
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
};

export const AdviseeAttendanceByModule = async (request: any, response: any) => {
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
};