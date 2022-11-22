import { Schema } from "mongoose";

export interface ICourse {
  courseName: string;
  courseLeader: {
    firstName: string;
    lastName: string;
    _id?: Schema.Types.ObjectId;
  };
  students: [
    {
      firstName: string;
      lastName: string;
      _id?: Schema.Types.ObjectId;
    }
  ];
  modules: [
    {
      moduleName: string;
      _id?: Schema.Types.ObjectId;
    }
  ];
  _id?: Schema.Types.ObjectId;
}
