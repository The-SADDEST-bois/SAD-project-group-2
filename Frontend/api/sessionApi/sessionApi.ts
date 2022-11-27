import api from "../config/apiconfig";
import { ISession } from "../../types/types";
import headerAuthorisationWithParams from "../../src/utils/headerAuthorization/headerAuthorisationWithParams";
import headerAuthorisation from "../../src/utils/headerAuthorization/headerAuthorisation";
import { AxiosResponse } from "axios";

export const newSessionApi = async (session: ISession) => {
  const res = await api.post<ISession>("session/newSession", session);
  console.log(res);
};

export const getAllSessionsApi = async (_id: string) => {
  const res = await api.get(
    "session/sessionByTutor",
    headerAuthorisationWithParams({ _id: _id })
  );
  return res.data as ISession[];
};

export const getAllSessionsByDate = async (_id: string, date: Date) => {
  const res = await api.get(
    "session/sessionByTutorAndDate",
    headerAuthorisationWithParams({ _id: _id, date: date.toISOString() })
  );
  return res.data as ISession[];
};

export const setSessionOpen = async (session: ISession) => {
    const res = await api.post<ISession, AxiosResponse>(
      "session/toggleSession",
      session,
      headerAuthorisation()
    );
    if (res.status === 200) {
      return res.data;
    }
    return res;
};

export const getSessionAttendees = async (_id: string) => {
  try {
    if (_id) {
      const res = await api.get(
        "session/attendance",
        headerAuthorisationWithParams({ _id: _id })
      );
      return res.data;
    }
    return Error("No session id provided");

  } catch (error: any) {
    console.log(error);
    return error.response;
  }
};

export const setStudentAttendance = async (data: {
  sessionId: string;
  firstName: string;
  lastName: string;
  status: number;
  sessionCode: string;
}) => {
  const res = await api.post<AxiosResponse>("session/sessionAttendance", data,
  headerAuthorisation());

  if (res.status === 200) {
    return res.data;
  }
  return res;
};
