import express, { Request, Response } from "express";
import { ISession } from "../Interfaces/ISession";
import Sessions from "../Models/Session";
import AttendanceRegisters from "../Models/AttendanceRegister";
import StatusCode from "../Utils/StatusCodes";
const sessionController = express.Router();

// Session controller post endpoint (adds session to database) (can rename to /createSession if necessary)

sessionController.post("/", (request, response) => {
  response.status(404).json({ message: "Not found" });
});

sessionController.post("/toggleSession", (request, response) => {
  const body: ISession = request.body;
  Sessions.findOneAndUpdate(
    { _id: body._id },
    { isOpen: body.isOpen },
    { new: true },
    (err, doc) => {
      if (err) {
        response
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server error" });
      } else {
        response
          .status(StatusCode.OK)
          .json({ message: "Session updated successfully" });
      }
    }
  );
});

sessionController.get("/allSessions", (request, response) => {
  Sessions.find()
    .populate("tutor")
    .exec((err, sessions) => {
      if (err) {
        response
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server error" });
      } else {
        response.status(StatusCode.OK).json(sessions);
      }
    });
});

sessionController.get("/sessionByTutor", async (request, response) => {
  const id = request.query._id;

  Sessions.find({ "tutor.tutorId": id }, (err: any, document: any) => {
    if (err) {
      response
        .status(err.status || StatusCode.BAD_REQUEST)
        .json({ error: "Error getting sessions", message: err });
      return;
    } else {
      //console.log("successful session retrieval", document);
      response.status(StatusCode.OK).json(document);
    }
  });
});

sessionController.get("/attendance", async (request, response) => {
  const id = request.query._id;
  var registerQuery = AttendanceRegisters.find({
    sessionID: id,
  }).select("attendance.firstName attendance.lastName attendance.attended");

  registerQuery.exec((err: any, document: any) => {
    if (err) {
      response
        .status(err.status || StatusCode.BAD_REQUEST)
        .json({ error: "Error getting register", message: err });
      return;
    } else {
      response.status(StatusCode.OK).json(document);
    }
  });
});

sessionController.post("/newSession", (request, response) => {
  const session = request.body;
  Sessions.create(session, (err: any, document: any) => {
    if (err) {
      console.log("error creating session", err);
      response
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Error creating session", message: err });
    } else {
      console.log("successful session creation", document);
      response
        .status(StatusCode.OK)
        .json({ message: "Session created successfully" });
    }
  });
});

export default sessionController;
