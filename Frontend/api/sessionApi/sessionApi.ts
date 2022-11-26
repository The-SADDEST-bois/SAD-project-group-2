import React from "react";
import api from "../config/apiconfig";
import { ISession } from "../../types/types";
import headerAuthorisationWithParams from "../../src/utils/headerAuthorization/headerAuthorisationWithParams";
import headerAuthorisation from "../../src/utils/headerAuthorization/headerAuthorisation";

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
  const res = await api.post<ISession>(
    "session/toggleSession",
    session,
    headerAuthorisation()
  );
  return res.data;
};

export const getSessionAttendees = async (_id: string) => {
  if (_id) {
    const res = await api.get(
      "session/attendance",
      headerAuthorisationWithParams({ _id: _id })
    );
    return res.data;
  }
  return Error("No session id provided");
};

export const setStudentAttendance = async (data: {
  sessionId: string;
  firstName: string;
  lastName: string;
  status: number;
  sessionCode: string;
}) => {
  const res = await api.post("session/sessionAttendance", data,
  headerAuthorisation());
  return res.data;
};
