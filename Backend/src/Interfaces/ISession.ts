import { Schema } from "mongoose";
import { SessionTypes } from "../Types/SessionTypes";

export interface ISession {
  sessionType: SessionTypes;
  tutor: {
    firstName: string,
    lastName: string,
    _id?: Schema.Types.ObjectId
  };
  startTime: Date;
  duration?: number;
  isOpen: boolean;
  _id?: Schema.Types.ObjectId;
}