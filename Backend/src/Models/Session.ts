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
  startTime: { type: Date, required: true },
  duration: { type: Number, required: false },
  isOpen: { type: Boolean, required: true },
});

const Sessions = mongoose.model("Session", sessionSchema);

export default Sessions;
