import type { IUser } from "../../types/types";

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
