import { useEffect, useState } from "react";
import { IUser } from "../../types/types";
import Cookies from "js-cookie";
import api from "../../api/config/apiconfig";

const useAuth = () => {
    const [user, setUser] = useState<IUser>();

    const login = (user: IUser, accessToken: string) => {
        Cookies.set("accessToken", JSON.stringify(accessToken), { expires: 30 });
        setUser(user);
    }

    const logout = () => {
        setUser(undefined);
    }

    return { user, login, logout };
}

export default useAuth;