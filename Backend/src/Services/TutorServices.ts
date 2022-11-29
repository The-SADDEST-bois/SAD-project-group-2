import StatusCode from "../Utils/StatusCodes";
import Modules from "../Models/Module";
import Sessions from "../Models/Session";

export const GetModulesByTutor =  (request: any, response: any) => {
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
};

export const GetSessionsByModule = (request: any, response: any) => {
    const moduleName = request.query.moduleName;
    Sessions.find({ moduleName: moduleName }, (err: any, document: any) => {
      if (err) {
        console.log("Error finding sessions per module name", err);
        return response
          .status(err.status || StatusCode.BAD_REQUEST)
          .json({ error: "Error getting sessions", message: err });
      }
      return response.status(StatusCode.OK).json(document);
    });
};

export const GetSessionsByModuleBetweenDateRange = async (request: any, response: any) => {
    const {moduleName, startDate, endDate} = request.query;
    Sessions.find(
      { moduleName: moduleName, startDate: {"$gte" : startDate, "$lt" : endDate} },
      (err: any, document: any) => {
        if (err) {
          return response
            .status(err.status || StatusCode.BAD_REQUEST)
            .json({ error: "Error getting sessions", message: err });
        }
        console.log("document", document);
        return response.status(StatusCode.OK).json(document);
      }
    );
};