import express from "express";
import AttendanceRegisters from "../Models/AttendanceRegister";
const sessionController = express.Router();

sessionController.post("/sessionAttendance", async (request, response) => {
  const body = request.body as {
    sessionId: string;
    firstName: string;
    surname: string;
    newAttendance: number;
  };

  console.log(body);

  const filter = {
    sessionID: body.sessionId,
    attendance: {
      $elemMatch: {
        firstName: "Joe",
      },
    },
  };
  const update = {
    $set: {
      "attendance.$.attended": 1,
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

  // AttendanceRegisters.findOneAndUpdate(filter, (err: any, doc: any) => {
  //     if (err) {
  //         response.status(500).json({ message: "Internal server error" });
  //     } else {
  //         console.log(doc);
  //         response.status(200).json({ message: "Session updated successfully" });
  //     }
  // });
});

export default sessionController;
