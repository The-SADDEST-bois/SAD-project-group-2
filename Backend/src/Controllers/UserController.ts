import express from "express";
import mongoose from "mongoose";
import { userSchema, IUser } from "../Schema";

const Schema = mongoose.model<IUser>("userSchema", userSchema);

export async function userController(
  request: express.Request,
  response: express.Response
) {
  // Schema.findOne({}, (err: unknown, users: IUser) => {
  //     if (err) {
  //         response.send(err);
  //     }
  //     response.status(200).send(JSON.stringify(users));
  // });
}
