import express from "express";
import StatusCode from "../Utils/StatusCodes";
import { IsCourseLeaderRole } from "../Utils/CheckRole";
import Modules from "../Models/Module";

const courseLeaderController = express.Router();



export default courseLeaderController;