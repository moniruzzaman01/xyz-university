import { NextFunction, Request, Response } from "express";

const globalErrorHanlder = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): any => {
  const statusCode = err.statusCode || 500;
  const success = false;
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    success,
    message,
    error: err,
  });
};

export default globalErrorHanlder;
