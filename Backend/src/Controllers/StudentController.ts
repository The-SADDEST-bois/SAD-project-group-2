import express from "express";
import Users from "../Models/User";
import StatusCode from "../Utils/StatusCodes";

const studentController = express.Router();

studentController.get("/all", (request, response) => {
  Users.find({ role: "Student" }, (err: any, document: any) => {
    if (err) {
      console.log("error getting students", err);
      response
        .status(err.status || StatusCode.BAD_REQUEST)
        .json({ error: "Error getting students", message: err });
    } else {
      console.log("successful student retrieval", document);
      response.status(StatusCode.OK).json(document);
    }
  });
});
export default studentController;
