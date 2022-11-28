import express from "express";
import { checkAuth } from "../middleware/CheckAuth";
import moduleLeaderController from "../Controllers/ModuleLeaderController";

const ModuleLeaderRouteHandler = express.Router();

ModuleLeaderRouteHandler.use(checkAuth);
ModuleLeaderRouteHandler.use(moduleLeaderController);

export default ModuleLeaderRouteHandler;