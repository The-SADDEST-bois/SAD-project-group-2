import express from "express";
import AttendanceController from "../Controllers/AttendanceController";

const SessionRouteHandler = express.Router();

SessionRouteHandler.use(AttendanceController);

export default SessionRouteHandler;