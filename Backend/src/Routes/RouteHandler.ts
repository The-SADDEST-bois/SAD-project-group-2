import express from "express";
import sessionController from "../Controllers/SessionController";
import studentController from "../Controllers/StudentController";
import userController from "../Controllers/UserController";

const RouteHandler = express.Router();

RouteHandler.use("/user", userController);
RouteHandler.use("/session", sessionController);
RouteHandler.use("/student", studentController);

export default RouteHandler;
