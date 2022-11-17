import mongoose, { Schema } from "mongoose";
import { ICourse } from "../Interfaces/ICourse";

const courseSchema = new Schema<ICourse>({
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

const Courses = mongoose.model("Course", courseSchema);

export default Courses;