import { verifyToken } from "../middleware/jwt";

export const checkAuth = (request: any, response: any, next: any) => {
    const cookie: string = request.body.accessToken;
    if (!cookie){
        console.log('Token is missing');
        response.status(401).json({ error: "Missing token" }).send();
    }
    else {
        verifyToken(JSON.parse(cookie))
        .then(() => {
            console.log('Token verified');
            next();
        })
        .catch(() => {
            console.log('Bad token');
            response.status(401).json({ error: "Invalid token"}).send();
        });
    }
}