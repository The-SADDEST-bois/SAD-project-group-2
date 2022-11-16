import mongoose, { Schema } from "mongoose";
import { ISession } from "../Interfaces/ISession";

const sessionSchema = new Schema<ISession>({
  sessionName: { type: String, required: true },
  date: { type: String, required: true },
});

const Sessions = mongoose.model("Session", sessionSchema);

export default Sessions;
