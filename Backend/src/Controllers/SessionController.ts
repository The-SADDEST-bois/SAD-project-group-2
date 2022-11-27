import express from "express";
import { ISession } from "../Interfaces/ISession";
import StatusCode from "../Utils/StatusCodes";
import Sessions from "../Models/Session";
import {
  IsCourseLeaderRole,
  IsTutorRole,
  IsModuleLeaderRole,
} from "../Utils/CheckRole";
const sessionController = express.Router();

// Session controller post endpoint (adds session to database) (can rename to /createSession if necessary)

sessionController.post("/", (request, response) => {
  response.status(404).json({ message: "Not found" });
});

sessionController.post("/toggleSession", (request: any, response: any) => {
  if (!IsTutorRole(request)) {
    console.log(request.headers);
    return response.status(StatusCode.FORBIDDEN).json({
      error: "Forbidden",
      message: "You are do not have the correct privileges for this request",
    });
  }
  const body: ISession = request.body;
  Sessions.findOneAndUpdate(
    { _id: body._id },
    { isOpen: body.isOpen },
    { new: true },
    (err, doc) => {
      if (err) {
        return response
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server error" });
      }
      return response
        .status(StatusCode.OK)
        .json({ message: "Session Started" });
    }
  );
});

sessionController.get("/allSessions", (request, response) => {
  Sessions.find()
    .populate("tutor")
    .exec((err, sessions) => {
      if (err) {
        return response
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server error" });
      }
      return response.status(StatusCode.OK).json(sessions);
    });
});

sessionController.get("/sessionByTutor", async (request, response) => {
  const id = request.query._id;

  Sessions.find({ "tutor.tutorId": id }, (err: any, document: any) => {
    if (err) {
      return response
        .status(err.status || StatusCode.BAD_REQUEST)
        .json({ error: "Error getting sessions", message: err });
    }
    return response.status(StatusCode.OK).json(document);
  });
});

sessionController.get("/sessionByTutorAndDate", async (request, response) => {
  const { _id, date } = request.query;
  Sessions.find(
    { "tutor.tutorId": _id, startTime: date },
    (err: any, document: any) => {
      if (err) {
        return response
          .status(err.status || StatusCode.BAD_REQUEST)
          .json({ error: "Error getting sessions", message: err });
      }
      return response.status(StatusCode.OK).json(document);
    }
  );
});

sessionController.get("/attendance", async (request, response) => {
  const id = request.query._id;
  var attendanceQuery = Sessions.findById(id).select("attendance");

  attendanceQuery.exec((err: any, document: any) => {
    if (err) {
      return response
        .status(err.status || StatusCode.BAD_REQUEST)
        .json({ error: "Error getting register", message: err });
    }
    response.status(StatusCode.OK).json(document);
  });
});

sessionController.post("/newSession", (request, response) => {
  const session = request.body;
  Sessions.create(session, (err: any, document: any) => {
    if (err) {
      return response
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Error creating session", message: err });
    }
    return response
      .status(StatusCode.OK)
      .json({ message: "Session created successfully" });
  });
});

sessionController.post(
  "/sessionAttendance",
  async (request: any, response: any) => {
    if (!IsTutorRole(request)) {
      return response.status(StatusCode.FORBIDDEN).json({
        error: "Forbidden",
        message: "You are do not have the correct privileges for this request",
      });
    }
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
          return response.status(500).json({
            message: "Internal server error",
          });
        }
        console.log("document = ", doc);
        return response.status(200).json({
          message: "Success",
        });
      }
    );
  }
);

export default sessionController;
