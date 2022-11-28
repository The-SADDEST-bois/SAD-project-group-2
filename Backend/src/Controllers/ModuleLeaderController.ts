import express from "express";
import StatusCode from "../Utils/StatusCodes";
import { IsModuleLeaderRole } from "../Utils/CheckRole";
import Modules from "../Models/Module";

const moduleLeaderController = express.Router();

moduleLeaderController.get("/allModules", (request: any, response: any) => {
    if (!IsModuleLeaderRole(request)) {
      return response
        .status(StatusCode.FORBIDDEN)
        .json({
          error: "Forbidden",
          message: "You do not have the correct privileges for this request",
        });
    }
      const tutorId = request.query.tutorId;
      Modules.find({ "tutors.tutorId": tutorId }, (err: any, document: any) => {
        if (err) {
          console.log("Error Registering: ", err);
          return response
            .status(err.status || StatusCode.BAD_REQUEST)
            .json({ error: "Error getting modules", message: err });
        }
        return response.status(StatusCode.OK).json(document);
      });
  });

export default moduleLeaderController;