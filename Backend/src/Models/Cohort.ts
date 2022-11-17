import mongoose, { Schema } from "mongoose";
import { ICohort } from "../Interfaces/ICohort";

const cohortSchema = new Schema<ICohort>({
    module: {
        _id: { type: Schema.Types.ObjectId, required: true },
        moduleName: { type: String, required: true },
        moduleLeader: { type: String, required: true}
    },
    students:
    [
        {
            _id: { type: Schema.Types.ObjectId, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String, required: true} 
        }
    ],
  });

const Modules = mongoose.model("Cohort", cohortSchema);

export default Modules;