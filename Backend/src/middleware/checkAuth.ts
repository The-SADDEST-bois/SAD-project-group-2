import { ITokenData } from "../Interfaces/ITokenData";
import { verifyToken } from "../middleware/jwt";

export const checkAuth = (request: any, response: any, next: any) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    if (!token) {
      console.log("Token is missing");
      response.status(401).json({ error: "Missing token" }).send();
    } else {
      verifyToken(JSON.parse(token))
        .then((data) => {
          const tokenData = data as unknown as ITokenData;
          console.log("Token verified");
          request.body.role = tokenData.data.role;
          next();
        })
        .catch(() => {
          console.log("Bad token");
          response.status(401).json({ error: "Invalid token" }).send();
        });
    }
  } catch (error) {
    console.log("No authorization header set");
    response.status(401).json({ error: "Bearer not added" }).send();
  }
};
