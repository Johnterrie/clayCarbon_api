import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import createError from "http-errors";
import iUser from "../types/user"
import { UserValidation, UserIdValidation } from '../validations/User';

/**
 * Update user
 * @param userId
 * @param userModelValidation
 */
