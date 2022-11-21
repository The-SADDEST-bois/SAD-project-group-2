import express from "express";
import userController from "../Controllers/UserController";

const UserRouteHandler = express.Router();

UserRouteHandler.use(userController);

export default UserRouteHandler;