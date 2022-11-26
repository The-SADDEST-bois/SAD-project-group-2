import type { IUser } from "../../types/types";
import api from "../config/apiconfig";
import { ICredentials } from "../../types/types";

function assertIsUser(user: any): asserts user is IUser {
  if (user.name === undefined) {
    throw new Error("user.name is undefined");
  }
  if (user.email === undefined) {
    throw new Error("user.email is undefined");
  }
}

export const fetchUser = async () => {
  const response = await api.get("/user");
  if (!response) {
    throw new Error("Problem fetching data");
  }
  const data = (await response.data) as IUser;

  console.log(data);

  assertIsUser(data);
  return data;
};

export const addUserToDatabase = async (payload: IUser) => {
  const res = await api.post<IUser>(`/user/register`, payload);

  console.log("after post", res);

  return;
};

export const loginUser = async (credentials: ICredentials) => {
  return await api.post(`/user/login`, {
    data: {
      email: credentials.email,
      password: credentials.password,
    },
  });
};

export const reAuthenticate = async (token: string) => {
  return await api.post(`/user/reauthenticate`, {
    accessToken: token,
  });
};
