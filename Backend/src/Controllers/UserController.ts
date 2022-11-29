import express from "express";
import { LoginUser, ReauthenticateUser, RegisterUser, AllStudents } from "../Services/UserServices";

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

  return AllStudents(request, response);

});

export default userController;
