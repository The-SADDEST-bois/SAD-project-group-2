import express from "express";
import StatusCode from "../Utils/StatusCodes";
import AcademicAdvisors from "../Models/AcademicAdvisor";

const advisorController = express.Router();

advisorController.get("/getAllAdvisees", (request: any, response: any) => {
  const id = request.query._id;

  var GetAdviseesQuery = AcademicAdvisors.find({ advisorId: id }).select(
    "advisees"
  );

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
});

export default advisorController;
