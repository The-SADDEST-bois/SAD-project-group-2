import express from "express";
import mongoose from "mongoose";
import { ISession } from "../Interfaces/ISession";
import { sessionSchema } from "../Models/Session";

const Schema = mongoose.model<ISession>("sessionSchema", sessionSchema);
const sessionController = express.Router();

// Session controller post endpoint (adds session to database) (can rename to /createSession if necessary)

sessionController.post("/", (request, response) => {
  const session = request.body;
  const newSession = new Schema(session);
  newSession.save((err: unknown) => {
    if (err) {
      response.send(err);
    } else {
      response.status(200).send("OK");
    }
  });
});

export default sessionController;
