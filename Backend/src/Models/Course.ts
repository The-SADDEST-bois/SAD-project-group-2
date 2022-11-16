import mongoose, { Schema } from "mongoose";
import { ICourse } from "../Interfaces/ICourse";

const userSchema = new Schema<ICourse>({
    _id: { type: Schema.Types.ObjectId, required: true },
    courseName: { type: String, required: true },
    courseLeader: {
        _id: { type: Schema.Types.ObjectId, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true}
    },
    studentID: { type: [String], required: true},
    modules: 
    [
        {
            _id: { type: Schema.Types.ObjectId, required: true },
            moduleName: { type: String, required: true },
            moduleLeader: { type: String, required: true }
        }
    ]
  });

const Course = mongoose.model("Course", userSchema);

export default Course;