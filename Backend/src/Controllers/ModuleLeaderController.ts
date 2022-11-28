import express from "express";
import StatusCode from "../Utils/StatusCodes";
import { IsModuleLeaderRole } from "../Utils/CheckRole";


const moduleLeaderController = express.Router();

export default moduleLeaderController;