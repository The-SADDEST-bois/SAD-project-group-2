import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'
import {userSchema, IUser} from "./Schema";
import {userController} from "./Controllers/UserController";
import {sessionController} from "./Controllers/SessionController";


dotenv.config()

const app = express();
const port = 8080; // default port to listen
app.use(cors());
app.use(express.json());

mongoose.connect(
    process.env.MONGODB_URI
);

const db = mongoose.connection;

db.on("error", console.log.bind(console, "MongoDB connection error:"));

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );

// listen for get requests on the / route and return user
app.get("/user", userController);

app.post("/session", sessionController);

