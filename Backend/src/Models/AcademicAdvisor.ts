import mongoose, { Schema } from "mongoose";
import { IAcademicAdvisor } from "../Interfaces/IAcademicAdvisor";

const academicAdvisorSchema = new Schema<IAcademicAdvisor>({
  advisees: [{ type: Schema.Types.ObjectId, required: false }],
  advisorId: { type: Schema.Types.ObjectId, required: false },
});

const AcademicAdvisors = mongoose.model(
  "AcademicAdvisor",
  academicAdvisorSchema
);

export default AcademicAdvisors;
