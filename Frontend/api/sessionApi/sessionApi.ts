import React from "react";
import api from "../config/apiconfig";
import { ISession } from "../../types/types";

export const newSessionApi = async (session: ISession) => {
  const res = await api.post<ISession>("session", session);
  console.log(res);
};
