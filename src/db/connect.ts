import mongoose from "mongoose";

const connectDB = (url: string) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("connected to database");
    })
    .catch(() => {
      console.log("Error connecting to database");
    });
};

export default connectDB;
