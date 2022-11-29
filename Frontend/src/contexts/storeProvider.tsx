import { createContext, useContext } from "react";
import { IUser } from "../../types/types";
import useAuth from "../hooks/useAuth";
import useDate from "../hooks/useDate";

interface IAuth {
  user: IUser;
  login: (user: IUser, accessToken: string) => void;
  logout: () => void;
  Authenticate: () => void;
}

interface IstaticTime {
  Date: Date;
}

interface IStoreProviderContext {
  auth: IAuth;
  staticTime: IstaticTime;
}
const GlobalContext = createContext({} as IStoreProviderContext);

export const StoreProvider = ({ children }: any) => {
  const authState = useAuth();
  const staticDate = useDate();

  const auth: IAuth = {
    user: authState.user,
    login: authState.login,
    logout: authState.logout,
    Authenticate: authState.Authenticate,
  };

  const staticTime: IstaticTime = {
    Date: staticDate.date,
  };

  return (
    <GlobalContext.Provider value={{ auth, staticTime }}>{children}</GlobalContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(GlobalContext);
  return store;
};
