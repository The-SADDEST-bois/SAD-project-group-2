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
  _id?: Schema.Types.ObjectId;
}
