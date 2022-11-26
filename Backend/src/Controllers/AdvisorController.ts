import express from "express";
import StatusCode from "../Utils/StatusCodes";
import AcademicAdvisors from "../Models/AcademicAdvisor";
import { IsAdvisorRole } from "../Utils/CheckRole";

const advisorController = express.Router();

advisorController.get("/adviseesByAdvisorId", (request: any, response: any) => {
  if (!IsAdvisorRole(request)) {
    response
      .status(StatusCode.FORBIDDEN)
      .json({
        error: "Forbidden",
        message: "You are do not have the correct privileges for this request",
      })
      .send();
  } else {
    const advisorId = request.query._id;

    var GetAdviseesQuery = AcademicAdvisors.find({
      advisorId: advisorId,
    }).select("advisees");

    GetAdviseesQuery.exec((err: any, document: any) => {
      if (err) {
        response
          .status(err.status || StatusCode.BAD_REQUEST)
          .json({ error: "Error getting advisees", message: err });
        return;
      } else {
        response.status(StatusCode.OK).json(document);
      }
    });
  }
});

export default advisorController;
