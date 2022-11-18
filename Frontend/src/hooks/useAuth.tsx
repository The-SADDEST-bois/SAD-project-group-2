import { useEffect, useState } from "react";
import { IUser } from "../../types/types";
import Cookies from "js-cookie";
import { reAuthenticate } from "../../api/userApi/userApi";

const useAuth = () => {
    const [user, setUser] = useState<IUser>();

    const Authenticate = () => {
        const cookie = Cookies.get("accessToken");
        if (cookie) {
            reAuthenticate(cookie).then((response) => {
                console.log(response.data.user);
            });
        }
        setUser(undefined);
    };

    const login = (user: IUser, accessToken: string) => {
        Cookies.set("accessToken", JSON.stringify(accessToken), { expires: 30 });
        setUser(user);
    }

    const logout = () => {
        setUser(undefined);
    }

    return { user, login, logout, Authenticate };
}

export default useAuth;