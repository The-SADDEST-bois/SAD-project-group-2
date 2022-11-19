import express from "express";
import studentController from "../Controllers/StudentController";

const StudentRouteHandler = express.Router();

StudentRouteHandler.use(studentController);

export default StudentRouteHandler;