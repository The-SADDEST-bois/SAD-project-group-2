import express from "express";
import mongoose from "mongoose";
import { userSchema, IUser } from "../Schema";
import bcrypt from "bcrypt";

const Schema = mongoose.model<IUser>("userSchema", userSchema);
const userController = express.Router();

// User Controller test endpoint (returns first user in database)

userController.post("/", async (req, response) => {
  const body = req.body.data;
  const { email, password } = body;
  const user = await Schema.findOne({ email });

  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(
      password as string,
      user.password
    );
    if (validPassword) {
      console.log("VALID");
      // TODO redirect to main page
      const data = {email: user.email, password: '', role: user.role};
      response.status(200).json({ messasge: 'Success', other: data }).send();
    } else {
      console.log("NOT VALID");

      response.status(400).json({ error: "Invalid Password" });
    }
  } else {
    response.status(401).json({ error: "User does not exist" });
  }
});

// User Controller post endpoint (adds user to database) (can rename to /createUser if necessary)
userController.post("/register", async (req, res) => {
  const userObj = req.body;
  const newUserSchema = mongoose.model<IUser>("userSchema", userSchema);

  const newUser = new newUserSchema(userObj);
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  newUser.save((err: any, document: any) => {
    if (err) {
      console.log("ERRRROR", err);
      res.send(err);
    }
    console.log("success", document);
    res.status(200).send("ok");
  });
});

export default userController;
