import { Schema } from "mongoose";

export interface ICourse {
    _id: Schema.Types.ObjectId;
    courseName: string;
    courseLeader: {
        _id: Schema.Types.ObjectId,
        firstName: string,
        lastName: string
    };
    studentID: string[];
    modules:
    [
        {
            _id: Schema.Types.ObjectId,
            moduleName: string,
            moduleLeader: string
        }
    ];  
  }