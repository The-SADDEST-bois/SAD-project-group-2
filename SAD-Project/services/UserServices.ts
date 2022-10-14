import type { User } from "../types/types";

export async function fetchUser(): Promise<User | undefined> {
    try {
        const data = await fetch('http://localhost:8080/user');
        //cast data to a User
        const user: User = await data.json();
        return user;
    } catch (err) {
        console.log(err);
    }
    return undefined;
}