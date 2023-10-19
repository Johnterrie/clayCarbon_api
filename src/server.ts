import config from "config";
import connectDB from "./db/connect";
import express from "express";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB(config.get("database"));
app.listen(config.get("PORT"), () => {
  console.log("server started on port", config.get("PORT"));
});
