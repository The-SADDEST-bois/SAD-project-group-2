import express from "express";
import Users from "../Models/User";
import bcrypt from "bcrypt";

const userController = express.Router();

// User Controller test endpoint (returns first user in database)

userController.post("/", async (req, response) => {
  const body = req.body.data;
  const { email, password } = body;
  const user = await Users.findOne({ email: email });

  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(
      password as string,
      user.password
    );
    if (validPassword) {
      console.log("VALID");
      // TODO redirect to main page
      response.status(200).json({ message: "Valid password" });
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

  const salt = await bcrypt.genSalt(10);
  userObj.password = await bcrypt.hash(userObj.password, salt);

  Users.create(userObj, (err: any, document: any) => {
    if (err) {
      console.log("ERRRROR", err);
      res.send(err);
    }
    console.log("success", document);
    res.status(200).send("ok");
  });
});

export default userController;
