import React from "react";
import api from "../config/index";
import { ISession } from "../../types/types";

export const newSessionApi = async (session: ISession) => {
  const res = await api.post<ISession>("session", session, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  console.log(res);
};
