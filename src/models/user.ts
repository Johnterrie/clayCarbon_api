import { NextFunction } from "express";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import iUser from "../types/user";

const UserSchema: Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is Required"],
      unique: true,
      lowercase: true,
      min: [6, "Username must be more than 6 Characters"],
      max: 255,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter a email address"],
      trim: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      min: [8, "Password must be More than 6 Characters"],
      max: 255,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next: NextFunction) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

// create JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    config.get<string>("secret"),
    {
      expiresIn: "5min",
    }
  );
};

// compare password
UserSchema.methods.comparePassword = async function (userPassword: string) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

const User = mongoose.model<iUser>("User", UserSchema);
export default User;
