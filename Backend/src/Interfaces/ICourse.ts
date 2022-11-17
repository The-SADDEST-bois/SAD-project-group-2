import { Schema } from "mongoose";

export interface ICourse {
    courseName: string;
    courseLeader: {
        firstName: string,
        lastName: string,
        _id?: Schema.Types.ObjectId
    };
    studentID: string[];
    modules:
    [
        {
            moduleName: string,
            moduleLeader: string,
            _id?: Schema.Types.ObjectId
        }
    ];  
    _id?: Schema.Types.ObjectId;
  }