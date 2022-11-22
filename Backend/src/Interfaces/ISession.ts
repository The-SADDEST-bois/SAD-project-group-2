import { Schema } from "mongoose";
import { SessionTypes } from "../Utils/SessionTypes";

export interface ISession {
  sessionType: SessionTypes;
  tutor: {
    firstName: string,
    lastName: string,
    tutorId?: Schema.Types.ObjectId
  };
  startTime: Date;
  duration?: number;
  isOpen: boolean;
  _id?: Schema.Types.ObjectId;
}