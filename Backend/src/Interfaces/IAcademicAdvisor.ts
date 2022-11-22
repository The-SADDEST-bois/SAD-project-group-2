import { Schema } from "mongoose";

export interface IAcademicAdvisor {
  advisees: [
    {
      firstName: string;
      lastName: string;
      adviseeId: Schema.Types.ObjectId;
    }
  ];
  advisorId: Schema.Types.ObjectId;
}
