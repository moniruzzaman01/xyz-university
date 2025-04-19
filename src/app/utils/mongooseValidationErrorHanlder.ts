import mongoose from "mongoose";
import { TCommonErrorResponse, TErrorSources } from "../globalTypes/error";

export const mongooseValidationErrorHanlder = (
  err: mongoose.Error.ValidationError
): TCommonErrorResponse => {
  const errorSources: TErrorSources = Object.values({
    lastName: {
      name: "ValidatorError",
      message: "Last Name is required",
      properties: {
        message: "Last Name is required",
        type: "required",
        path: "lastName",
      },
      kind: "required",
      path: "lastName",
    },
  }).map((val) => {
    return {
      path: val.path,
      message: val.message,
    };
  });

  const statusCode = 400;
  const message = "validation error!";
  return { statusCode, message, errorSources };
};
