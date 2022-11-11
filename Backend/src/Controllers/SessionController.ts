import express from "express";
import mongoose from "mongoose";
import { sessionSchema, ISession } from "../Schema";

const Schema = mongoose.model<ISession>("sessionSchema", sessionSchema);

export async function sessionController(
  request: express.Request,
  response: express.Response
) {
  const session = request.body;
  const newSession = new Schema(session);
  newSession.save((err: unknown) => {
    if (err) {
      console.log('here');
      response.send(err);
    }
    response.status(200);
  });
}
