import express from "express";
import Users from "../Models/User";
import bcrypt from "bcrypt";
import { accessToken, verifyToken } from "../middleware/jwt";
import { IUser } from "../Interfaces/IUser";
import { ITokenData } from "../Interfaces/ITokenData";
import StatusCode from "../Utils/StatusCodes";
import { LoginUser, ReauthenticateUser, RegisterUser, GetAllStudents } from "../Services/UserServices";

const userController = express.Router();

// User Controller test endpoint (returns first user in database)

userController.post("/login", async (request: any, response: any) => {
  
  return await LoginUser(request, response);

});

userController.post("/reauthenticate", async (request: any, response: any) => {

  return await ReauthenticateUser(request, response);

});

// User Controller post endpoint (adds user to database) (can rename to /createUser if necessary)
userController.post("/register", async (request: any, response: any) => {

  return await RegisterUser(request, response);

});

userController.get("/allStudents", (request: any, response: any) => {

  return GetAllStudents(request, response);

});

export default userController;
