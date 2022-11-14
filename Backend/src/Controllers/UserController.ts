import express from "express";
import mongoose from "mongoose";
import { userSchema, IUser } from "../Schema";

const Schema = mongoose.model<IUser>("userSchema", userSchema);
const userController = express.Router();

// User Controller test endpoint (returns first user in database)

userController.get("/", (req, response) => {
  {
    Schema.findOne({}, (err: unknown, users: IUser) => {
      if (err) {
        response.send(err);
      }
      response.status(200).send(JSON.stringify(users));
    });
  }
});

// User Controller post endpoint (adds user to database) (can rename to /createUser if necessary)
userController.post("/", (req, res) => {
  const newUserSchema = mongoose.model<IUser>("userSchema", userSchema);

  const userObj = req.body;

  const newUser = new newUserSchema(userObj);

  newUser.save((err: any) => {
    if (err) {
      res.send(err);
    }

    res.status(200).send("ok");
  });
});

export default userController;
