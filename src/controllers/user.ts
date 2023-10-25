import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import createError from "http-errors";
import iUser from "../types/user";
import { UserValidation, UserIdValidation } from "../validations/User";
import { addUser, processUpdate } from "../helpers/user";

/**
 * Create new user
 * @param req
 * @param res
 * @param next
 */

interface BodyRequest extends iUser {
  body: {
    username: string;
    name: string;
    email: string;
    password: string;
  };
}

export const createUser = async (
  req: BodyRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userModelValidation: iUser = await UserValidation.validateAsync(
      req.body
    );
  } catch (error: any) {}
};
