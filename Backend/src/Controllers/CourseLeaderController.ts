import express from "express";
import StatusCode from "../Utils/StatusCodes";
import { IsCourseLeaderRole } from "../Utils/CheckRole";
import Courses from "../Models/Course";

const courseLeaderController = express.Router();

courseLeaderController.get("/allCourses", (request: any, response: any) => {
    if (!IsCourseLeaderRole(request)) {
      return response
        .status(StatusCode.FORBIDDEN)
        .json({
          error: "Forbidden",
          message: "You do not have the correct privileges for this request"
        });
    }
      const courseLeaderId = request.query.courseLeaderId;
      Courses.find({ "courseLeader._id": courseLeaderId }, (err: any, document: any) => {
        if (err) {
          console.log("Error getting courses: ", err);
          return response
            .status(err.status || StatusCode.BAD_REQUEST)
            .json({ error: "Error getting courses", message: err });
        }
        return response.status(StatusCode.OK).json(document);
      });
  });

export default courseLeaderController;