import express from "express";
import mongoose from "mongoose";
import { sessionSchema, ISession } from "../Schema";

const Schema = mongoose.model<ISession>("sessionSchema", sessionSchema);
const sessionController = express.Router();

sessionController.post("/", (request, response) => {
  const session = request.body;
  const newSession = new Schema(session);
  newSession.save((err: unknown) => {
    if (err) {
      response.send(err);
    }
    response.status(200).send("OK");
  });
});

export default sessionController;
