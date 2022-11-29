import express from "express";
import StatusCode from "../Utils/StatusCodes";
import { IsCourseLeaderRole  } from "../Utils/CheckRole";
import { CoursesByCourseLeader, OverallCourseAttendance } from "../Services/CourseLeaderServices";

const courseLeaderController = express.Router();

courseLeaderController.get("/allCourses", (request: any, response: any) => {
  if (!IsCourseLeaderRole(request)) {
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  }

  return CoursesByCourseLeader(request, response);

});

courseLeaderController.get("/overallCourseAttendance", async (request: any, response: any) => {
    if (!IsCourseLeaderRole(request)) {
      return response.status(StatusCode.FORBIDDEN).json({
        error: "Forbidden",
        message: "You are do not have the correct privileges for this request",
      });
    }

    return await OverallCourseAttendance(request, response);

  });

export default courseLeaderController;
