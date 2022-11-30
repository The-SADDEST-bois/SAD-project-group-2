import bcrypt from "bcrypt";
import Users from "../Models/User";
import { IUser } from "../Interfaces/IUser";
import { ITokenData } from "../Interfaces/ITokenData";
import { Roles } from "../../src/Types/Roles";
import StatusCode from "../Utils/StatusCodes";
import { accessToken, verifyToken } from "../middleware/jwt";

export const LoginUser = async (request: any, response: any) => {
  try {
    const body = request.body.data;
    const { email, password } = body;

    const user = await Users.findOne({ email });

    if (user) {
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
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: "Invalid Password" });
    }
    return response
      .status(StatusCode.UNAUTHORIZED)
      .json({ error: "User does not exist" });
  } catch (error) {
    console.log(error);
    return response
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const ReauthenticateUser = async (request: any, response: any) => {
  const cookie: string = request.body.accessToken;
  const result: any = await verifyToken(JSON.parse(cookie));

  if (result instanceof Error) {
    return response
      .status(StatusCode.UNAUTHORIZED)
      .json({ error: "Invalid Token" });
  }
  try {
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
  } catch (error) {
    return response
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const RegisterUser = async (request: any, response: any) => {
  const userObj = request.body;
  const salt = await bcrypt.genSalt(10);
  userObj.password = await bcrypt.hash(userObj.password, salt);

  Users.create(userObj, (err: any, document: any) => {
    if (err) {
      console.log("error registering", err);
      return response.status(StatusCode.BAD_REQUEST).send(err);
    }

    console.log("successful register", document);
    return response.status(StatusCode.OK).send("ok");
  });
};

export const AllStudents = (request: any, response: any) => {
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
};
