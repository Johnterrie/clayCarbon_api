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

    if (!userModelValidation) {
      return next(
        new createError.BadRequest(
          "Operation failed, invalid details provided."
        )
      );
    } else {
      const isUserNameAvailable = await User.findOne({
        username: userModelValidation.username,
      });
      if (isUserNameAvailable) {
        res.status(400).json({
          message: `Username ${userModelValidation.username} is not available`,
        });
      } else {
        const newUser = await addUser(userModelValidation);
        if (newUser) {
          res.status(201).json({
            newUser,
          });
        } else {
          return next(
            res.status(400).json({
              message: "Invalid details provided.",
            })
          );
        }
      }
    }
  } catch (error: any) {
    if (error.isJoi === true) {
      return next(
        res.status(400).json({
          message: "Invalid details provided.",
        })
      );
    }
    next(error);
  }
};
