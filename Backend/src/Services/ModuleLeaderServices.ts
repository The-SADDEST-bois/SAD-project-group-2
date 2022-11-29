import Modules from "../Models/Module";
import Sessions from "../Models/Session";
import StatusCode from "../Utils/StatusCodes";

export const ModulesByModuleLeader = async (request: any, response: any) => {
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
};

export const OverallModuleAttendance = async (request: any, response: any) => {
  try {
    const moduleName = request.query.moduleName;
    const attendanceFromAllModuleSessions = await Sessions.find({
      moduleName: moduleName,
    }).select("attendance");
    var numberOfStudents = 0;
    var numberOfAttended = 0;

    for (let i = 0; i < attendanceFromAllModuleSessions.length; i++) {
      numberOfStudents += attendanceFromAllModuleSessions[i].attendance.length;
    }

    for (let i = 0; i < attendanceFromAllModuleSessions.length; i++) {
      attendanceFromAllModuleSessions[i].attendance.forEach((student: any) => {
        if (student.status === 1) {
          numberOfAttended++;
        }
      });
    }

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
};

export const OverallCohortAttendance = async (request: any, response: any) => {
  try {
    const cohort = request.query.cohortName;
    const attendanceFromSessionsByCohort = await Sessions.find({
      cohort: cohort,
    }).select("attendance");
    var numberOfStudents = 0;
    for (let i = 0; i < attendanceFromSessionsByCohort.length; i++) {
      numberOfStudents += attendanceFromSessionsByCohort[i].attendance.length;
    }
    var numberOfAttended = 0;
    for (let i = 0; i < attendanceFromSessionsByCohort.length; i++) {
      attendanceFromSessionsByCohort[i].attendance.forEach((student: any) => {
        if (student.status === 1) {
          numberOfAttended++;
        }
      });
    }

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
};

export const DeleteSession = (request: any, response: any) => {
    const sessionId = request.query.sessionId;
    Sessions.deleteOne({ _id: sessionId }, (err: any, document: any) => {
      if (err) {
        return response
          .status(err.status || StatusCode.BAD_REQUEST)
          .json({ error: "Error deleting session", message: err });
      }
      return response.status(StatusCode.OK).json(document);
    });
};