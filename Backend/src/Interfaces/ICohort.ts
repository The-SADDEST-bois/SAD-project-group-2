import { Schema } from "mongoose";

export interface ICohort {
    _id?: Schema.Types.ObjectId;
    module: {
        _id?: Schema.Types.ObjectId,
        moduleName: string,
        moduleLeader: string
    };
    students:
    [
        {
            _id?: Schema.Types.ObjectId,
            firstName: string,
            lastName: string
        }
    ];
  }