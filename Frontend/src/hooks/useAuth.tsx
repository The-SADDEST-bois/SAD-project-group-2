import { useEffect, useState } from "react";
import { IUser } from "../../types/types";
import Cookies from "js-cookie";
import { reAuthenticate } from "../../api/userApi/userApi";

const useAuth = () => {
    const [user, setUser] = useState<IUser>();

    const Authenticate = async () => {
        const cookie = Cookies.get("accessToken");
        if (cookie) {
            reAuthenticate(cookie).then((response) => {
                setUser(response.data.user as IUser);
            });
        }
        setUser(undefined);
    };

    const login = async (user: IUser, accessToken: string) => {
        Cookies.set("accessToken", JSON.stringify(accessToken), { expires: 30 });
        setUser(user);
    }

    const logout = async () => {
        setUser(undefined);
    }

    return { user, login, logout, Authenticate };
}

export default useAuth;