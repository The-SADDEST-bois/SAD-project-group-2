import { Schema } from "mongoose";

export interface IModule {
    _id: Schema.Types.ObjectId;
    moduleName: string;
    moduleLeader: {
        _id: Schema.Types.ObjectId,
        firstName: string,
        lastName: string
    };
    tutors:
    [
        {
            _id: Schema.Types.ObjectId,
            firstName: string,
            lastName: string
        }
    ];
    sessionID: [string]
  }