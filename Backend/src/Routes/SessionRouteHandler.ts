import express from "express";
import { checkAuth } from "../middleware/CheckAuth";
import sessionController from "../Controllers/SessionController";

const SessionRouteHandler = express.Router();
SessionRouteHandler.use(checkAuth);
SessionRouteHandler.use(sessionController);

export default SessionRouteHandler;
