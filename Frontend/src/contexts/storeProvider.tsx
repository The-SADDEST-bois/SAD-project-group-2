import { createContext, useContext } from "react";
import { IUser } from "../../types/types";
import useAuth from "../hooks/useAuth";

interface IAuth {
  user: IUser;
  login: (user: IUser, accessToken: string) => void;
  logout: () => void;
  Authenticate: () => void;
}
interface IStoreProviderContext {
  auth: IAuth;
}
const GlobalContext = createContext({} as IStoreProviderContext);

export const StoreProvider = ({ children }: any) => {
  const authState = useAuth();

  const auth: IAuth = {
    user: authState.user,
    login: authState.login,
    logout: authState.logout,
    Authenticate: authState.Authenticate,
  };

  return (
    <GlobalContext.Provider value={{ auth }}>{children}</GlobalContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(GlobalContext);
  return store;
};
