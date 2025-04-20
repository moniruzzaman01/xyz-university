import mongoose from "mongoose";
import { TCommonErrorResponse, TErrorSources } from "../globalTypes/error";

export const mongooseValidationErrorHanlder = (
  err: mongoose.Error.ValidationError
): TCommonErrorResponse => {
  console.log("err", err);
  const errorSources: TErrorSources = Object.values(err.errors).map((val) => {
    return {
      path: val.path,
      message: val.message,
    };
  });

  const statusCode = 400;
  const message = "validation error!";
  return { statusCode, message, errorSources };
};
