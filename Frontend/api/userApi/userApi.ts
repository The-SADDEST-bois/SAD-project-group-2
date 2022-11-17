import type { IUser } from "../../types/types";
import api from "../config/apiconfig";

function assertIsUser(user: any): asserts user is IUser {
  if (user.name === undefined) {
    throw new Error("user.name is undefined");
  }
  if (user.email === undefined) {
    throw new Error("user.email is undefined");
  }
}

export async function fetchUser() {
  const response = await fetch("http://localhost:8080/user");
  if (!response.ok) {
    throw new Error("Problem fetching data");
  }
  const data = (await response.json()) as IUser;

  console.log(data);

  assertIsUser(data);
  return data;
}

export const addUserToDatabase = async (payload: IUser) => {
  const res = await api.post<IUser>("/user/register", payload);

  console.log(res);

  return;
};

interface ICredentials {
  email: string;
  password: string;
}

// Promise<{ data?: INoteTag[]; error?: Error }>

export const login = async (credentials: ICredentials) => {
  return await api
    .post(`/user`, {
      data: {
        email: credentials.email,
        password: credentials.password,
      },
    })
};
