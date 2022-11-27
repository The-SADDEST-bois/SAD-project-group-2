import express from "express";
import { IsStudentRole } from "../Utils/CheckRole";
import Sessions from "../Models/Session";
import StatusCode from "../Utils/StatusCodes";
import { DocumentResultManager } from "../Utils/DocumentResultManager";
import { DocumentStatus } from "../Utils/DocumentStatus";

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
      isOpen: true,
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
        console.log("Document: ", document);
        var result = DocumentResultManager(document);

        if (result === DocumentStatus.PreviouslyUpdated) {
          response.status(StatusCode.OK).json({
              message: "You have already joined this session"
          });
        } else if (result === DocumentStatus.NotFound) {
          response.status(StatusCode.NOT_FOUND).json({
            error: "Session not found",
            message: "Unable to join this session"
          });
        } else {
          console.log("Joined session");
          response.status(StatusCode.OK).json({
            message: "Successfully joined session"
          });
        }

      }
    });
  }
});

export default studentController;
