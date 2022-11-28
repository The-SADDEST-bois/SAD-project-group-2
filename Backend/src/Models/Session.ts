import mongoose, { Schema } from "mongoose";
import { ISession } from "../Interfaces/ISession";

export const sessionSchema = new Schema<ISession>({
  sessionType: { type: String, required: true },
  sessionCode: { type: String, required: true },
  tutor: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    tutorId: { type: Schema.Types.ObjectId, required: false },
  },
  courses: [
    {
      courseName: { type: String, required: true },
      courseId: { type: Schema.Types.ObjectId, required: false },
    },
  ],
  cohorts: [
    {
      cohortId: { type: Schema.Types.ObjectId, required: true },
      cohortName: { type: String, required: true },
    },
  ],
  attendance: [
    {
      firstName: { type: String, required: false },
      lastName: { type: String, required: false },
      status: { type: Number, required: false, default: 0 },
      studentId: { type: Schema.Types.ObjectId, required: false },
    },
  ],
  moduleName: { type: String, required: true },
  startDate: { type: Date, required: true },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: false },
  isOpen: { type: Boolean, required: true },
});

const Sessions = mongoose.model("Session", sessionSchema);

export default Sessions;
