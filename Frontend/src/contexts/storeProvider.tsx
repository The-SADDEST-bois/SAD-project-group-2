import React, {createContext, useContext, useEffect} from "react";
import { IUser } from "../../types/types";
import useAuth from "../hooks/useAuth";


const GlobalContext = createContext<any>(null);

export const StoreProvider = ({children}: any) => {
    
    const auth = useAuth();

    const store = {
        auth: {
            user: auth.user,
            login: auth.login,
            logout: auth.logout,
            Authenticate: auth.Authenticate
        }
    }

    return (
        <GlobalContext.Provider value={store}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useStore = () => {
    const store = useContext(GlobalContext);
    return store;
}