import { Schema } from "mongoose";

export interface IModule {
    moduleName: string;
    moduleLeader: {
        firstName: string,
        lastName: string,
        _id?: Schema.Types.ObjectId
    };
    tutors:
    [
        {
            firstName: string,
            lastName: string,
            _id?: Schema.Types.ObjectId
        }
    ];
    sessionID: string[];
    _id?: Schema.Types.ObjectId;
  }