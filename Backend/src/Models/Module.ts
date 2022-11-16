import mongoose, { Schema } from "mongoose";
import { IModule } from "../Interfaces/IModule";

const userSchema = new Schema<IModule>({
    _id: { type: Schema.Types.ObjectId, required: true },
    moduleName: { type: String, required: true },
    moduleLeader: {
        _id: { type: Schema.Types.ObjectId, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true}
    },
    tutors:
    [
        {
            _id: { type: Schema.Types.ObjectId, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true} 
        }
    ],
    sessionID: { type: [String], required: true}
  });

const Module = mongoose.model("Module", userSchema);

export default Module;