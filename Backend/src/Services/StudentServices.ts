import Sessions from "../Models/Session";
import { DocumentResultManager } from "../Utils/DocumentResultManager";
import { DocumentStatus } from "../Utils/DocumentStatus";
import StatusCode from "../Utils/StatusCodes";

export const RegisterStudentAttendance = (request: any, response: any) => {
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
      return response.status(err.status || StatusCode.BAD_REQUEST).json({
        error: "Error registering student for session",
        message: err,
      });
    }
    console.log("Document: ", document);
    var result = DocumentResultManager(document);

    if (result === DocumentStatus.PreviouslyUpdated) {
      return response.status(StatusCode.OK).json({
        message: "You have already joined this session",
      });
    }
    if (result === DocumentStatus.NotFound) {
      return response.status(StatusCode.NOT_FOUND).json({
        error: "Session not found",
        message: "Unable to join this session",
      });
    }
    console.log("Joined session");
    return response.status(StatusCode.OK).json({
      message: "Successfully joined session",
    });
  });
};
