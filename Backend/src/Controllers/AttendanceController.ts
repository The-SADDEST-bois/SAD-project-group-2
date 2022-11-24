import express from "express";
import AttendanceRegisters from "../Models/AttendanceRegister";
const sessionController = express.Router();

sessionController.post("/sessionAttendance", async (request, response) => {
  const body = request.body as {
    sessionId: string;
    firstName: string;
    surname: string;
    attended: number;
  };

  const filter = {
    sessionID: body.sessionId,
    attendance: {
      $elemMatch: {
        firstName: body.firstName,
      },
    }
  };

  const update = {
    $set: {
      "attendance.$.attended": body.attended,
    },
  }; 
  AttendanceRegisters.updateOne(filter, update, (err: any, doc: any) => {
    if (err) {
      console.log(err);
      response.status(500).json({ message: "Internal server error" });
    } else {
      console.log(doc);
      response.status(200).json({ message: "Success" });
    }
  });
});

export default sessionController;