import mongoose, { Schema } from "mongoose";
import { ISession } from "../Interfaces/ISession";

export const sessionSchema = new Schema<ISession>({
  sessionType: { type: String, required: true },
  tutor: {
    tutorId: { type: Schema.Types.ObjectId, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true}
  },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: false },
  isOpen: { type: Boolean, required: true}
});

const Sessions = mongoose.model("Session", sessionSchema);

export default Sessions;
