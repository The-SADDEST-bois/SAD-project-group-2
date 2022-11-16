import React, {useEffect, useState} from "react";
import { IUser } from "../../types/types";
import { useStore } from "../contexts/storeProvider";

export const UserName = () => {

  const authStore = useStore();

  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    setCurrentUser(authStore.auth.user);
  }, [authStore.auth.user]);

  return <p>{currentUser?.name}</p>;
};
