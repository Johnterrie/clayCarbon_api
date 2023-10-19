import config from "config";
import connectDB from "./db/connect";
import express from "express";

const app = express();

connectDB(config.get("database"));
app.listen(config.get("PORT"), () => {
  console.log("server started on port", config.get("PORT"));
});
