import express from "express";
import { checkAuth } from "../middleware/CheckAuth";
import studentController from "../Controllers/StudentController";

const StudentRouteHandler = express.Router();

StudentRouteHandler.use(checkAuth);
StudentRouteHandler.use(studentController);

export default StudentRouteHandler;