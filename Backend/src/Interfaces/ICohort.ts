import { Schema } from "mongoose";

export interface ICohort {
  module: {
    moduleName: string;
    moduleLeader: string;
    moduleId: Schema.Types.ObjectId;
  };
  students: [
    {
      firstName: string;
      lastName: string;
      studentId: Schema.Types.ObjectId;
    }
  ];
  _id?: Schema.Types.ObjectId;
}
