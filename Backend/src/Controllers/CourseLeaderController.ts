import express from "express";
import StatusCode from "../Utils/StatusCodes";
import { IsCourseLeaderRole } from "../Utils/CheckRole";
import Courses from "../Models/Course";
import Sessions from "../Models/Session";

const courseLeaderController = express.Router();

courseLeaderController.get("/allCourses", (request: any, response: any) => {
  if (!IsCourseLeaderRole(request)) {
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  }
  const courseLeaderId = request.query.courseLeaderId;
  Courses.find(
    { "courseLeader._id": courseLeaderId },
    (err: any, document: any) => {
      if (err) {
        console.log("Error getting courses: ", err);
        return response
          .status(err.status || StatusCode.BAD_REQUEST)
          .json({ error: "Error getting courses", message: err });
      }
      return response.status(StatusCode.OK).json(document);
    }
  );
});

courseLeaderController.get(
  "/overallCourseAttendance",
  async (request: any, response: any) => {
    if (!IsCourseLeaderRole(request)) {
      return response.status(StatusCode.FORBIDDEN).json({
        error: "Forbidden",
        message: "You are do not have the correct privileges for this request",
      });
    }
    try {
      const courseName = request.query.courseName;
      const attendanceFromAllSessionsInCourse = await Sessions.find({
        courseName: courseName,
      }).select("attendance");

      var numberOfStudents = 0;
      for (let i = 0; i < attendanceFromAllSessionsInCourse.length; i++) {
        numberOfStudents +=
          attendanceFromAllSessionsInCourse[i].attendance.length;
      }

      var numberOfAttended = 0;
      for (let i = 0; i < attendanceFromAllSessionsInCourse.length; i++) {
        attendanceFromAllSessionsInCourse[i].attendance.forEach(
          (student: any) => {
            if (student.status === 1) {
              numberOfAttended++;
            }
          }
        );
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
        message: "Error getting overall course attendance",
      });
    }
  }
);

export default courseLeaderController;
