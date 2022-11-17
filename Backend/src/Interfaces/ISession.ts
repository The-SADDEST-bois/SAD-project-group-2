import { Schema } from "mongoose";
import { SessionTypes } from "../Utils/SessionTypes";

export interface ISession {
  _id?: Schema.Types.ObjectId;
  sessionType: SessionTypes;
  tutor: {
    _id?: Schema.Types.ObjectId,
    firstName: string,
    lastName: string
  };
  startTime: Date;
  duration?: number;
  isOpen: boolean;
}