import express from "express";
import StatusCode from "../Utils/StatusCodes";
import Modules from "../Models/Module";

const tutorController = express.Router();

tutorController.get("/allModules", (request: any, response: any) => {
    const body = request.body.data;
    const { tutorId } = body;
    console.log("TutorId: " + tutorId);

    Modules.find({"tutors.tutorId": tutorId }, (err: any, document: any) => {
    if (err) {
        console.log("Error Registering: ", err);
        response
        .status(err.status || StatusCode.BAD_REQUEST)
        .json({ error: "Error getting modules", message: err });
    } else {
        console.log("Document: ", document);
        response.status(StatusCode.OK).json(document);
    }
    });
  });

export default tutorController;