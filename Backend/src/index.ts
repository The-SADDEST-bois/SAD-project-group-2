import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import RouteHandler from "./Utils/RouteHandler";

dotenv.config();

const app = express();
const port = 8080; // default port to listen
app.use(cors());
app.use(express.json());

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});

// DB Connection Callbacks

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to database at port 27017"); // tslint:disable-line:no-console
});
mongoose.connection.on("error", () => {
  console.log("Error connecting to database"); // tslint:disable-line:no-console
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from database"); // tslint:disable-line:no-console
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Disconnected from database due to application termination"); // tslint:disable-line:no-console
    process.exit(0);
  });
});

app.use("/", RouteHandler);
