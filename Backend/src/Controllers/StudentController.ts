import express from "express";
import { IsStudentRole } from "../Utils/CheckRole";
import Sessions from "../Models/Session";
import StatusCode from "../Utils/StatusCodes";

const studentController = express.Router();

studentController.post("/registerAttendance", (request: any, response: any) => {
  if (!IsStudentRole(request)) {
    console.log("hit");
    response
      .status(StatusCode.FORBIDDEN)
      .json({
        error: "Forbidden",
        message: "You are do not have the correct privileges for this request",
      })
      .send();
  } else {
    const body = request.body;
    const { sessionCode, userId } = body;
    console.log("SessionCode: " + sessionCode + " UserId: " + userId);

    const filter = {
      sessionCode: sessionCode,
      attendance: {
        $elemMatch: {
          _id: userId,
        },
      },
    };

    const update = {
      $set: {
        "attendance.$.status": 1,
      },
    };

    Sessions.updateOne(filter, update, (err: any, document: any) => {
      if (err) {
        console.log("Error Registering: ", err);
        response.status(err.status || StatusCode.BAD_REQUEST).json({
          error: "Error registering student for session",
          message: err,
        });
      } else {
        response.status(StatusCode.OK).json(document);
      }
    });
  }
});

export default studentController;
