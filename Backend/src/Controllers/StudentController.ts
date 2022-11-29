import express from "express";
import { IsStudentRole } from "../Utils/CheckRole";
import StatusCode from "../Utils/StatusCodes";
import { RegisterStudentAttendance } from "../Services/StudentServices";

const studentController = express.Router();

studentController.post("/registerAttendance", (request: any, response: any) => {
  if (!IsStudentRole(request)) {
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You are do not have the correct privileges for this request"
    });
  }

  return RegisterStudentAttendance(request, response);

});

export default studentController;
