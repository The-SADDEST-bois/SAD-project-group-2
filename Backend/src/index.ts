import express from "express";
import cors from "cors";
import mongoose, { Schema } from "mongoose";
import * as dotenv from "dotenv";
import { userSchema, IUser } from "./Schema";
import { sessionController } from "./Controllers/SessionController";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const port = 8080; // default port to listen
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", console.log.bind(console, "MongoDB connection error:"));

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

// listen for get requests on the / route and return user
app.post("/user", async (req, res) => {
  const newUserSchema = mongoose.model<IUser>("userSchema", userSchema);

  const userObj = req.body;

  const newUser = new newUserSchema(userObj);
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  newUser.save((err: any) => {
    if (err) {
      res.send(err);
    }

    res.status(200).send("ok");
  });
});

app.post("/session", sessionController);
