import mongoose, { Schema } from "mongoose";
import { ICohort } from "../Interfaces/ICohort";

const cohortSchema = new Schema<ICohort>({
  courseId: { type: Schema.Types.ObjectId, required: false },
  cohortName: { type: String, required: false },
  students: [
    {
      _id: { type: Schema.Types.ObjectId, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
  ],
});

const Cohorts = mongoose.model("Cohort", cohortSchema);

export default Cohorts;
