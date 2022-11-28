import express from "express";
import { checkAuth } from "../middleware/CheckAuth";
import courseLeaderController from "../Controllers/CourseLeaderController";

const CourseLeaderRouteHandler = express.Router();

CourseLeaderRouteHandler.use(checkAuth);
CourseLeaderRouteHandler.use(courseLeaderController);

export default CourseLeaderRouteHandler;