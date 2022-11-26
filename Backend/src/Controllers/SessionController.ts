import express, { Request, Response } from "express";
import { ISession } from "../Interfaces/ISession";
import StatusCode from "../Utils/StatusCodes";
import Sessions from "../Models/Session";
import mongoose from "mongoose";
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

sessionController.get("/sessionByTutorAndDate", async (request, response) => {
  const {_id, date} = request.query;
  Sessions.find({ "tutor.tutorId": _id, startTime: date }, (err: any, document: any) => {
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
  var attendanceQuery = Sessions.findById(id).select("attendance");

  attendanceQuery.exec((err: any, document: any) => {
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

sessionController.post("/sessionAttendance", async (request, response) => {
  const body = request.body as {
    sessionId: string;
    firstName: string;
    lastName: string;
    status: number;
    sessionCode: string;
  };
  const sessionCode = body.sessionCode;

  Sessions.findOneAndUpdate(
    {
      sessionCode: sessionCode,
    },
    {
      $set: { "attendance.$[v1].status": body.status },
    },
    {
      arrayFilters: [{ "v1.firstName": body.firstName }],
    },
    (err: any, doc: any) => {
      if (err) {
        console.log(err);
        response.status(500).json({ message: "Internal server error" });
      } else {
        console.log("document = ", doc);
        response.status(200).json({ message: "Success" });
      }
    }
  );
});

export default sessionController;
