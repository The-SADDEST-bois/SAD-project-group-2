import { Schema } from "mongoose";

export interface IModule {
  moduleName: string;
  moduleLeader: {
    firstName: string;
    lastName: string;
    moduleLeaderId: Schema.Types.ObjectId;
  };
  tutors: [
    {
      firstName: string;
      lastName: string;
      tutorId: Schema.Types.ObjectId;
    }
  ];
  cohorts: [
    {
      cohortId: Schema.Types.ObjectId;
      courseName: string;
    }
  ];
  _id?: Schema.Types.ObjectId;
}
