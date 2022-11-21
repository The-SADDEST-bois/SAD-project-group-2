import { Schema } from "mongoose";

export interface IAcademicAdvisor {
  advisees: Schema.Types.ObjectId[];
  advisorId: Schema.Types.ObjectId;
}
