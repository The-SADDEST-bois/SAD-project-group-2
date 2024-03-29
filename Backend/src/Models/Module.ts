import mongoose, { Schema } from "mongoose";
import { IModule } from "../Interfaces/IModule";

const moduleSchema = new Schema<IModule>({
  moduleName: { type: String, required: true },
  moduleLeader: {
    moduleLeaderId: { type: Schema.Types.ObjectId, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  tutors: [
    {
      tutorId: { type: Schema.Types.ObjectId, required: false },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
  ],
  cohorts: [
    {
      cohortId: { type: Schema.Types.ObjectId, required: false },
      courseName: { type: String, required: true },
    },
  ],
});

const Modules = mongoose.model("Module", moduleSchema);

export default Modules;
