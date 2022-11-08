import { Schema } from "mongoose";

export interface IUser {
    name: string,
    email: string,
}

export const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
});