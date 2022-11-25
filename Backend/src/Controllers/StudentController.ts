import express from "express";
import { IsStudentRole } from "../Utils/CheckRole";
import Sessions from "../Models/Session";
import Users from "../Models/User";
import StatusCode from "../Utils/StatusCodes";
import { GetRoleFromRequest } from "../Utils/RequestFormatter";

const studentController = express.Router();

studentController.get("/all", (request: any, response: any) => {
  Users.find({ role: "Student" }, (err: any, document: any) => {
    if (err) {
      console.log("error getting students", err);
      response
        .status(err.status || StatusCode.BAD_REQUEST)
        .json({ error: "Error getting students", message: err });
    } else {
      console.log("successful student retrieval", document);
      response.status(StatusCode.OK).json(document);
    }
  });
});

studentController.post("/registerAttendance", (request: any, response: any) => {
  if (!IsStudentRole(GetRoleFromRequest(request))) {
    response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message:
        "You are do not have the correct privileges to register attendance",
    });

    const body = request.body.data;
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
