import { Schema } from "mongoose";

export interface ICohort {
  courseId: Schema.Types.ObjectId;
  cohortName: string;
  students: [
    {
      firstName: string;
      lastName: string;
      studentId: Schema.Types.ObjectId;
      _id: any;
    }
  ];
  _id?: Schema.Types.ObjectId;
}
