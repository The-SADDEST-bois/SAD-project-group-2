import { useEffect, useState } from "react";
import { IUser } from "../../types/types";

const useAuth = () => {
    const [user, setUser] = useState<IUser>();

    const login = (user: IUser) => {
        setUser(user);
    }

    const logout = () => {
        setUser(undefined);
    }

    return { user, login, logout };
}

export default useAuth;