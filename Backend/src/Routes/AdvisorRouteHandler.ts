import express from "express";
import { checkAuth } from "../middleware/CheckAuth";
import advisorController from "../Controllers/AdvisorController";

const AdvisorRouteHandler = express.Router();

AdvisorRouteHandler.use(checkAuth);
AdvisorRouteHandler.use(advisorController);

export default AdvisorRouteHandler;
