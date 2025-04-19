import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import zodErrorHandler from "../utils/zodErrorHandler";
import config from "../config";
import { TErrorSources } from "../globalTypes/error";
import mongoose from "mongoose";
import { mongooseValidationErrorHanlder } from "../utils/mongooseValidationErrorHanlder";

const globalErrorHanlder: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
): any => {
  let success = false;
  let statusCode = 500;
  let message = "something went wrong!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "something went wrong!",
    },
  ];

  //handle zod error formatting
  if (err instanceof ZodError) {
    const simplifiedError = zodErrorHandler(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  //mongoose validation error formatting
  else if (err instanceof mongoose.Error.ValidationError) {
    const simplifiedError = mongooseValidationErrorHanlder(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  //mongodb cast error formatting
  else if (err instanceof mongoose.Error.CastError) {
    console.log(err);
    statusCode = 400;
    message = "invalid mongodb id!";
    errorSources = [{ path: err.path, message: err.message }];
  }
  //mongodb duplicate value error formatting
  if ((err.code = 11000)) {
    const duplicateField = Object.keys(err.keyValue || {})[0];
    statusCode = 400;
    message = "validation error!";
    errorSources = [
      {
        path: duplicateField,
        message: duplicateField + " must be unique!",
      },
    ];
  }

  res.status(statusCode).json({
    success,
    message,
    errorSources,
    stack: config.node_env == "development" ? err.stack : null,
  });
};

export default globalErrorHanlder;
