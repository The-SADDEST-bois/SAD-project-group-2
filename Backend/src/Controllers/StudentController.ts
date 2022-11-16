import express from "express";
import Users from "../Models/User";

const studentController = express.Router();

studentController.get("/all", (request, response) => {
  Users.find({ role: "Student" }, (err: any, document: any) => {
    if (err) {
      console.log("error getting students", err);
      response
        .status(err.status || 400)
        .json({ error: "Error getting students", message: err });
    } else {
      console.log("successful student retrieval", document);
      response.status(200).json(document);
    }
  });
});
export default studentController;
