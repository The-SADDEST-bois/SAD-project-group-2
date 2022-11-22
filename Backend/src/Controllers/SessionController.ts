import express, { Request, Response } from "express";
import Users from "../Models/User";
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
        response.status(500).json({ message: "Internal server error" });
      } else {
        response.status(200).json({message: "Session updated successfully"});
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

sessionController.get("/sessionByTutor", async (request, response) => {
  const id = request.query._id;
  const tutor = await Users.findOne({
    _id: id,
  }).select("tutorId");
  console.log(tutor._id);

  Sessions.find({tutor: tutor }, (err: any, document: any) => {
    if (err) {
      response
        .status(err.status || 400)
        .json({ error: "Error getting sessions", message: err });
      return;
    } else {
      //console.log("successful session retrieval", document);
      response.status(200).json(document);
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
