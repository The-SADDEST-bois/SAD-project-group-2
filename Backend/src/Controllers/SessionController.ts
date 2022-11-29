import express from "express";
import StatusCode from "../Utils/StatusCodes";
import { StartSession, AllSessions, SessionsByTutor, SessionsByTutorAndDate, SessionAttendance, CreateSession, UpdateSessionAttendance } from "../Services/SessionServices";
import {
  IsTutorRole,
  HighPriviledgesRole,
} from "../Utils/CheckRole";
const sessionController = express.Router();

// Session controller post endpoint (adds session to database) (can rename to /createSession if necessary)

sessionController.post("/", (request: any, response: any) => {
  response.status(404).json({ message: "Not found" });
});

sessionController.post("/toggleSession", (request: any, response: any) => {
  if (!IsTutorRole(request)) {
    console.log(request.headers);
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  }

  return StartSession(request, response);

});

sessionController.get("/allSessions", (request: any, response: any) => {

  return AllSessions(request, response);

});

sessionController.get("/sessionByTutor", async (request: any, response: any) => {
  if (!HighPriviledgesRole(request)) {
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  }
  
  return await SessionsByTutor(request, response);

});

sessionController.get("/sessionByTutorAndDate", async (request: any, response: any) => {
  if (!HighPriviledgesRole(request)) {
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You do not have the correct privileges for this request",
    });
  }

  return await SessionsByTutorAndDate(request, response);

});

sessionController.get("/attendance", async (request: any, response: any) => {
    if (!HighPriviledgesRole(request)) {
      return response.status(StatusCode.FORBIDDEN).json({
        error: "Forbidden",
        message: "You do not have the correct privileges for this request"
      });
  }

  return await SessionAttendance(request, response);

});

sessionController.post("/newSession", (request: any, response: any) => {

  return CreateSession(request, response);

});

sessionController.post("/sessionAttendance", async (request: any, response: any) => {
    if (!IsTutorRole(request)) {
      return response.status(StatusCode.FORBIDDEN).json({
        error: "Forbidden",
        message: "You are do not have the correct privileges for this request",
      });
    }

    return await UpdateSessionAttendance(request, response);

  });

export default sessionController;
