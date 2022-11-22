import mongoose, { Schema } from "mongoose";
import { IAttendanceRegister } from "../Interfaces/IAttendanceRegister";

const attendanceRegisterSchema = new Schema<IAttendanceRegister>({
  attendance: [
    {
      studentId: { type: Schema.Types.ObjectId, required: false },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      attended: { type: Number, default: 0 },
    },
  ],
  sessionID: { type: Schema.Types.ObjectId, required: true },
});

const AttendanceRegisters = mongoose.model(
  "AttendanceRegister",
  attendanceRegisterSchema
);

export default AttendanceRegisters;
