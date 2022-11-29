import { ISession } from "../Interfaces/ISession";
import StatusCode from "../Utils/StatusCodes";
import Sessions from "../Models/Session";

export const StartSession = (request: any, response: any) => {
    const body: ISession = request.body;
    Sessions.findOneAndUpdate(
      { _id: body._id },
      { isOpen: body.isOpen },
      { new: true },
      (err, doc) => {
        if (err) {
          return response
            .status(StatusCode.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal server error" });
        }
        return response
          .status(StatusCode.OK)
          .json({ message: "Session Started" });
      }
    );
};

export const AllSessions = (request: any, response: any) => {
    Sessions.find()
    .populate("tutor")
    .exec((err, sessions) => {
      if (err) {
        return response
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ message: "Internal server error" });
      }
      return response.status(StatusCode.OK).json(sessions);
    });
};

export const SessionsByTutor = async (request: any, response: any) => {
    const id = request.query._id;

    Sessions.find({ "tutor.tutorId": id }, (err: any, document: any) => {
      if (err) {
        return response
          .status(err.status || StatusCode.BAD_REQUEST)
          .json({ error: "Error getting sessions", message: err });
      }
      return response.status(StatusCode.OK).json(document);
    });
};

export const SessionsByTutorAndDate = async (request: any, response: any) => {
    const { _id, date } = request.query;
    Sessions.find(
      { "tutor.tutorId": _id, startDate: date },
      (err: any, document: any) => {
        if (err) {
          return response
            .status(err.status || StatusCode.BAD_REQUEST)
            .json({ error: "Error getting sessions", message: err });
        }
        return response.status(StatusCode.OK).json(document);
      }
    );
};

export const SessionAttendance = async (request: any, response: any) => {
    const id = request.query._id;
    var attendanceQuery = Sessions.findById(id).select("attendance");
  
    attendanceQuery.exec((err: any, document: any) => {
      if (err) {
        return response
          .status(err.status || StatusCode.BAD_REQUEST)
          .json({ error: "Error getting register", message: err });
      }
      response.status(StatusCode.OK).json(document);
    });
};

export const CreateSession = (request: any, response: any) => {
    const session = request.body;
    Sessions.create(session, (err: any, document: any) => {
      if (err) {
        return response
          .status(StatusCode.INTERNAL_SERVER_ERROR)
          .json({ error: "Error creating session", message: err
        });
      }
      return response
        .status(StatusCode.OK).json({ message: "Session created successfully" });
    });
};

export const UpdateSessionAttendance = async (request: any, response: any) => {
    const body = request.body as {
        sessionId: string;
        firstName: string;
        lastName: string;
        status: number;
        sessionCode: string;
      };
      const sessionCode = body.sessionCode;
  
      Sessions.findOneAndUpdate(
        {
          sessionCode: sessionCode,
        },
        {
          $set: { "attendance.$[v1].status": body.status },
        },
        {
          arrayFilters: [{ "v1.firstName": body.firstName }],
        },
        (err: any, doc: any) => {
          if (err) {
            console.log(err);
            return response.status(500).json({
              message: "Internal server error",
            });
          };
          return response.status(200).json({
            message: "Success",
          });
        }
      );
};