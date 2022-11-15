import type { IUser } from "../../types/types";
import api from "../config";

function assertIsUser(user: any): asserts user is IUser {
  if (user.name === undefined) {
    throw new Error("user.name is undefined");
  }
  if (user.email === undefined) {
    throw new Error("user.email is undefined");
  }
}

export async function fetchUser() {
  const responce = await fetch("http://localhost:8080/user");
  if (!responce.ok) {
    throw new Error("Problem fetching data");
  }
  const data = (await responce.json()) as IUser;

  console.log(data);

  assertIsUser(data);
  return data;
}

export const addUserToDatabase = async (payload: IUser) => {
  const res = await api.post<IUser>("/user", payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  console.log(res);

  return;
};

interface ICredentials {
  email: string;
  password: string;
}

export const getUser = async (credentials: ICredentials) => {
  await api
    .post(`/user`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        email: credentials.email,
        password: credentials.password,
      },
    })
    .then((response) => {
      return response.data;
    });
};
