import AcademicAdvisors from "../Models/AcademicAdvisor";
import Sessions from "../Models/Session";
import StatusCode from "../Utils/StatusCodes";

export const AdviseesByAdvisor = async (request: any, response: any) => {
  const advisorId = request.query.advisorId;

  try {
    const adviseesQuery = await AcademicAdvisors.findOne({
      advisorId: advisorId,
    }).select("advisees");

    return response.status(StatusCode.OK).json(adviseesQuery.advisees);
  } catch (error) {
    return response.status(StatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "Error getting advisees",
    });
  }
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
