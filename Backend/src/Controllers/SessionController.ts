import express from "express";
import Sessions from "../Models/Session";
const sessionController = express.Router();

// Session controller post endpoint (adds session to database) (can rename to /createSession if necessary)

sessionController.post("/", (request, response) => {
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
