import React from "react";
import api from "../config/apiconfig";
import { ISession } from "../../types/types";

export const newSessionApi = async (session: ISession) => {
  const res = await api.post<ISession>("session/newSession", session);
  console.log(res);
};

export const getAllSessionsApi = async (_id: string) => {
  const res = await api.get("session/sessionByTutor", {
    params: {
      _id: _id,
    }
  });
  console.log(res.data);
  return res.data as ISession[];
}

export const setSessionOpen = async (session: ISession) => {
  const res = await api.post<ISession>("session/toggleSession", session);
  return res.data
}