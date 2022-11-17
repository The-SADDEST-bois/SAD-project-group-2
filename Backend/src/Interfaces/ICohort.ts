import { Schema } from "mongoose";

export interface ICohort {
    module: {
        moduleName: string,
        moduleLeader: string,
        _id?: Schema.Types.ObjectId
    };
    students:
    [
        {
            firstName: string,
            lastName: string,
            _id?: Schema.Types.ObjectId
        }
    ];
    _id?: Schema.Types.ObjectId;
  }