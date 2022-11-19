import express from "express";
import sessionController from "../Controllers/SessionController";

const SessionRouteHandler = express.Router();

SessionRouteHandler.use(sessionController);

export default SessionRouteHandler;