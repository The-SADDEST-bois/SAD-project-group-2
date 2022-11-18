import mongoose, { Schema } from "mongoose";
import { IAttendanceRegister } from "../Interfaces/IAttendanceRegister";

const attendanceRegisterSchema = new Schema<IAttendanceRegister>({
  attendance: [
    {
      _id: { type: Schema.Types.ObjectId, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      attended: Number,
    },
  ],
  sessionID: { type: Schema.Types.ObjectId, required: true },
});

const AttendanceRegisters = mongoose.model(
  "AttendanceRegister",
  attendanceRegisterSchema
);

export default AttendanceRegisters;
