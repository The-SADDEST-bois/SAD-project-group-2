import express from "express";
import Users from "../Models/User";
import bcrypt from "bcrypt";
import { accessToken, verifyToken } from "../middleware/jwt";
import { IUser } from "../Interfaces/IUser";
import { ITokenData } from "../Interfaces/ITokenData";
import { Roles } from "../../src/Types/Roles";
import StatusCode from "../Utils/StatusCodes";

const userController = express.Router();

// User Controller test endpoint (returns first user in database)

userController.post("/login", async (req, response) => {
  
  try {
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
  
        const cleanUser: IUser = {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: "",
          role: user.role,
        };
        const data: { _id: string; role: Roles } = {
          _id: user._id.toString(),
          role: user.role,
        };
        const newToken = accessToken(data);
        return response
          .status(StatusCode.OK)
          .json({ messasge: "Success", user: cleanUser, accessToken: newToken })
          .send();
      }
      
      console.log("NOT VALID");
  
      return response
        .status(StatusCode.BAD_REQUEST)
        .json({ error: "Invalid Password" });

    }
    return response
      .status(StatusCode.NOT_FOUND)
      .json({ error: "User does not exist" });

  } catch (error) {
    console.log(error);
    return response
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
});

userController.post("/reauthenticate", async (request, response) => {
  const cookie: string = request.body.accessToken;
  const result: any = await verifyToken(JSON.parse(cookie));

  if (result instanceof Error) {
    return response
      .status(StatusCode.UNAUTHORIZED)
      .json({ error: "Invalid Token" });
  }

  const data: ITokenData = result;
  const user = await Users.findOne({ _id: data.data._id });
  const cleanUser: IUser = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: "",
    role: user.role,
  };
  console.log("REAUTHENTICATE", Date.now());
  return response
    .status(StatusCode.OK)
    .json({ messasge: "Success", user: cleanUser })
    .send();
});

// User Controller post endpoint (adds user to database) (can rename to /createUser if necessary)
userController.post("/register", async (req, res) => {
  const userObj = req.body;
  const salt = await bcrypt.genSalt(10);
  userObj.password = await bcrypt.hash(userObj.password, salt);

  Users.create(userObj, (err: any, document: any) => {
    if (err) {
      console.log("error registering", err);
      return res.status(StatusCode.BAD_REQUEST).send(err);
    }

    console.log("successful register", document);
    return res.status(StatusCode.OK).send("ok");
  });
});

userController.get("/allStudents", (request: any, response: any) => {
  Users.find({ role: "Student" }, (err: any, document: any) => {
    if (err) {
      console.log("error getting students", err);
      return response
        .status(err.status || StatusCode.BAD_REQUEST)
        .json({ error: "Error getting students", message: err });
    }
      console.log("successful student retrieval", document);
      return response.status(StatusCode.OK).json(document);
  });
});

export default userController;
