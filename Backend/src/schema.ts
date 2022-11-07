import { model, Schema } from "mongoose";

export interface IUser {
    name: String,
    email: String,
}

export const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
});