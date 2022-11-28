import { Schema } from "mongoose";
import { SessionTypes } from "../Utils/SessionTypes";

export interface ISession {
  sessionType: SessionTypes;
  sessionCode: string;
  tutor: {
    firstName: string;
    lastName: string;
    tutorId?: Schema.Types.ObjectId;
  };
  courses: [
    {
      courseName: string;
      courseId?: Schema.Types.ObjectId;
    }
  ];
  cohorts: [
    {
      cohortId: Schema.Types.ObjectId;
      cohortName: string;
    }
  ];
  attendance: [
    {
      firstName: string;
      lastName: string;
      status: number;
      studentId: Schema.Types.ObjectId;
    }
  ];
  moduleName: string;
  startDate: Date;
  startTime: Date;
  duration?: number;
  isOpen: boolean;
  _id?: Schema.Types.ObjectId;
}
