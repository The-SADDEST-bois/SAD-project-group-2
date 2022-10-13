import express from "express";
import cors from "cors";
import { User } from "../types/types";

const app = express();
const port = 8080; // default port to listen
app.use(cors());

const user: User ={
    name: "John",
    email: "test@test.com",
}

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// listen for get requests on the / route and return user
app.get("/user", (req, res) => {
    res.status(200).send(JSON.stringify(user));
});