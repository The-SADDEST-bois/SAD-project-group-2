import { Schema } from "mongoose";

export interface IAttendanceRegister {
  attendance: [
    {
      firstName: string;
      lastName: string;
      attended: number;
      studentId: Schema.Types.ObjectId;
    }
  ];
  sessionID: Schema.Types.ObjectId;
  _id?: Schema.Types.ObjectId;
}
