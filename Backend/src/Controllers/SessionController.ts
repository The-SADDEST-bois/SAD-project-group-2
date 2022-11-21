import express, { Request, Response } from "express";
import { ISession } from "../Interfaces/ISession";
import Sessions from "../Models/Session";
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
        console.log("Something wrong when updating data!");
      } else {
        response.status(200);
      }
    }
  );
});

sessionController.get("/allSessions", (request, response) => {
  Sessions.find()
    .populate("tutor")
    .exec((err, sessions) => {
      if (err) {
        response.status(500).json({ message: "Internal server error" });
      } else {
        response.status(200).json(sessions);
      }
    });
});

sessionController.post("/newSession", (request, response) => {
  const session = request.body;
  Sessions.create(session, (err: any, document: any) => {
    if (err) {
      console.log("error creating session", err);
      response
        .status(400)
        .json({ error: "Error creating session", message: err });
    } else {
      console.log("successful session creation", document);
      response.status(200).json({ message: "Session created successfully" });
    }
  });
});

export default sessionController;
