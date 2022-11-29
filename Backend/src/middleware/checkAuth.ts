import { ITokenData } from "../Interfaces/ITokenData";
import { verifyToken } from "../middleware/jwt";
import StatusCode from "../Utils/StatusCodes";

export const checkAuth = async (request: any, response: any, next: any) => {
  try {
    const token: string =
      "" + request.headers.authorization.split(" ")[1].replaceAll("%22", "");

    if (!token) {
      console.log("Token is missing");
      response
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: "Missing token" })
        .send();
    }
    const result: any = await verifyToken(JSON.parse(token));
    if (result instanceof Error) {
      console.log("Token is invalid");
      response
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: "Invalid token" })
        .send();
    } else {
      const data: ITokenData = result;
      request.body.role = data.data.role;
      next();
    }
  } catch (error) {
    console.log(error, "No authorization header set");
    response
      .status(StatusCode.UNAUTHORIZED)
      .json({ error: "Bearer not added" })
      .send();
  }
};
