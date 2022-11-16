import { Schema } from "mongoose";

export interface ISession {
  _id?: Schema.Types.ObjectId;
  sessionName: string;
  date: string;
}