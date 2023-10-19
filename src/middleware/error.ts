import { Request, Response, NextFunction } from "express";
export const notFound = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(404).send("Resource Not Found");
  } catch (error) {
    next(error);
  }
};

export const tryAgain = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Error Processing Request";
    return res.status(status).send({
      status,
      message,
    });
  } catch (error) {
    next(error);
  }
};
