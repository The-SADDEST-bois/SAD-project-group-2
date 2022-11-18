import { Schema } from "mongoose";

export interface IAttendanceRegister {
  attendance: [
    {
      firstName: string;
      lastName: string;
      attendend: number;
      _id?: Schema.Types.ObjectId;
    }
  ];
  sessionID: Schema.Types.ObjectId;
  _id?: Schema.Types.ObjectId;
}
