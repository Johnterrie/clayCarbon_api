import config from "config";
import connectDB from "./db/connect";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { Request, Response, NextFunction } from "express";
import { tryAgain, notFound } from "./middleware/error";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan<Request, Response>("dev"));
app.use(tryAgain);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(config.get("database"));
    app.listen(config.get("PORT"), () => {
      console.log("Server is Listening on PORT", config.get("PORT"));
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

start();

export default app;
