import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const accessToken = (data: string) => jwt.sign({data}, process.env.ACCESS_KEY, {
    algorithm: 'HS256',
    expiresIn: '24h',
});

export const verifyToken = async (token: string) => jwt.verify(token, process.env.ACCESS_KEY, {
    algorithms: ['HS256']
}, (err, decoded) => {
    if (err) {
        return err;
    } else {
        return decoded;
    }
});

export const decodeToken = async (token: string) => jwt.decode(token, {
    complete: true
});