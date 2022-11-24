import express from "express";
import { checkAuth } from "../middleware/CheckAuth";
import tutorController from "../Controllers/TutorController";

const TutorRouteHandler = express.Router();

TutorRouteHandler.use(checkAuth);
TutorRouteHandler.use(tutorController);

export default TutorRouteHandler;