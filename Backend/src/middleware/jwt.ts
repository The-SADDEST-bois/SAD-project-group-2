import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import {  createSecretKey } from 'crypto';
import { IUser } from '../Interfaces/IUser';

dotenv.config();

export const accessToken = (data: IUser) => jwt.sign({data}, process.env.ACCESS_KEY, {
    algorithm: 'HS256',
    expiresIn: '30m',
});

export const refreshToken = (data: IUser) =>  jwt.sign({data}, process.env.REFRESH_KEY, {
    algorithm: 'HS256',
    expiresIn: '24h',
});