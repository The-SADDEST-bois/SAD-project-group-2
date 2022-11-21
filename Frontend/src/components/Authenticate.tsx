import { useEffect } from "react";
import { useStore } from "../contexts/storeProvider";

export const Authenticate = ({ children }: any) => {
  const authStore = useStore();

  useEffect(() => {
  authStore.auth.Authenticate();
  }, []);

  return children;
};
