import { Schema } from "mongoose";

export interface IUser {
    name: string,
    email: string,
}

export interface ISession {
    sessionName: string,
    date: string,
}

export const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
});

export const sessionSchema = new Schema<ISession>({
    sessionName: { type: String, required: true },
    date: { type: String, required: true },
});