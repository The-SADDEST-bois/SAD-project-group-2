import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'
import {userSchema, IUser} from "./Schema";
dotenv.config()

const app = express();
const port = 8080; // default port to listen
app.use(cors());

mongoose.connect(
    process.env.MONGODB_URI
);

const db = mongoose.connection;

db.on("error", console.log.bind(console, "MongoDB connection error:"));

const Schema = mongoose.model<IUser>("userSchema", userSchema);

const user: IUser = {
    name: "John",
    email: "test@test.com",
    roles: "admin"
}

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    // add user to database
    const newUser = new Schema(user);
    newUser.save();
    res.send( "Hello world!" );
} );

// listen for get requests on the / route and return user
app.get("/user", (req, res) => {
    // use mongoose to get all users in the database
    Schema.find({}, (err: unknown, users: IUser) => {
        if (err) {
            res.send(err);
        }
        res.status(200).send(JSON.stringify(users));
    });
});