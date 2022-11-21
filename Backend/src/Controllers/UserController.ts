import express from "express";
import Users from "../Models/User";
import bcrypt from "bcrypt";
import { accessToken, verifyToken } from "../middleware/jwt";
import { IUser } from "../Interfaces/IUser";
import { ITokenData } from "../Interfaces/ITokenData";
import { Roles } from "../../src/Types/Roles";

const userController = express.Router();

// User Controller test endpoint (returns first user in database)

userController.post("/login", async (req, response) => {
  const body = req.body.data;
  const { email, password } = body;
  const user = await Users.findOne({ email });

  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(
      password as string,
      user.password
    );
    if (validPassword) {
      console.log("VALID");
      
      const cleanUser: IUser = {firstName: user.firstName, lastName: user.lastName, email: user.email, password: '', role: user.role}
      const data: {_id: string, role: Roles} = { _id: user.id, role: user.role }
      const newToken = accessToken(data);
      response.status(200).json({ messasge: 'Success', user: cleanUser, accessToken: newToken}).send();
    } else {
      console.log("NOT VALID");

      response.status(400).json({ error: "Invalid Password" });
    }
  } else {
    response.status(401).json({ error: "User does not exist" });
  }
});

userController.post("/reauthenticate", async (request, response) => {
  const cookie: string = request.body.accessToken;
  const result: any = await verifyToken(JSON.parse(cookie));

  if (result instanceof Error) {
    response.status(401).json({ error: "Invalid Token" }).send();
  }

  const data: ITokenData = result
  const user = await Users.findOne( { _id: data.data._id } )
  const cleanUser: IUser = {firstName: user.firstName, lastName: user.lastName, email: user.email, password: '', role: user.role}
  console.log('REAUTHENTICATE', Date.now());
  response.status(200).json({ messasge: 'Success', user: cleanUser}).send();
})

// User Controller post endpoint (adds user to database) (can rename to /createUser if necessary)
userController.post("/register", async (req, res) => {
  const userObj = req.body;
  const salt = await bcrypt.genSalt(10);
  userObj.password = await bcrypt.hash(userObj.password, salt);

  Users.create(userObj, (err: any, document: any) => {
    if (err) {
      console.log("error registering", err);
      res.send(err);
    } else {
      console.log("successful register", document);
      res.status(200).send("ok");
    }
  });
});

export default userController;
