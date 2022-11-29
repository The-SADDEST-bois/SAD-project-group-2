import mongoose, { Schema } from "mongoose";
import { IAcademicAdvisor } from "../Interfaces/IAcademicAdvisor";

const academicAdvisorSchema = new Schema<IAcademicAdvisor>({
  advisees: [
    {
      adviseeId: { type: Schema.Types.ObjectId, required: false },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
  ],
  advisorId: { type: Schema.Types.ObjectId, required: false },
});

const AcademicAdvisors = mongoose.model(
  "AcademicAdvisor",
  academicAdvisorSchema
);

export default AcademicAdvisors;
