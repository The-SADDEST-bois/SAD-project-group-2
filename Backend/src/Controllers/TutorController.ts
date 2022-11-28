import express from "express";
import StatusCode from "../Utils/StatusCodes";
import Modules from "../Models/Module";
import Sessions from "../Models/Session";
import {
  IsModuleLeaderRole,
  IsTutorRole,
  isEvalatedRole,
} from "../Utils/CheckRole";

const tutorController = express.Router();

tutorController.get("/allModules", (request: any, response: any) => {
  if (!isEvalatedRole(request)) {
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  }
  const tutorId = request.query.tutorId;
  Modules.find({ "tutors.tutorId": tutorId }, (err: any, document: any) => {
    if (err) {
      console.log("Error Registering: ", err);
      return response
        .status(err.status || StatusCode.BAD_REQUEST)
        .json({ error: "Error getting modules", message: err });
    }
    return response.status(StatusCode.OK).json(document);
  });
});

tutorController.get("/sessionsPerModule", (request: any, response: any) => {
  if (!IsTutorRole(request)) {
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  } else {
    const moduleName = request.query.moduleName;
    Sessions.find({ moduleName: moduleName }, (err: any, document: any) => {
      if (err) {
        console.log("Error finding sessions per module name", err);
        return response
          .status(err.status || StatusCode.BAD_REQUEST)
          .json({ error: "Error getting sessions", message: err });
      }
      return response.status(StatusCode.OK).json(document);
    });
  }
});

tutorController.get("/sessionsPerModuleBetweenDateRange", async (request: any, response) => {
  console.log("request", request.query);
  if (!IsTutorRole(request)){
    return response
    .status(StatusCode.FORBIDDEN)
    .json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  } else {
    const {moduleName, startDate, endDate} = request.query;
    Sessions.find(
      { moduleName: moduleName, startDate: {"$gte" : startDate, "$lt" : endDate} },
      (err: any, document: any) => {
        if (err) {
          return response
            .status(err.status || StatusCode.BAD_REQUEST)
            .json({ error: "Error getting sessions", message: err });
        }
        console.log("document", document);
        return response.status(StatusCode.OK).json(document);
      }
    );
  };
});
export default tutorController;
