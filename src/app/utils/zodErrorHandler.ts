import { ZodError } from "zod";
import { TCommonErrorResponse, TErrorSources } from "../globalTypes/error";

const zodErrorHandler = (err: ZodError): TCommonErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;
  const message = "validation error!";
  return { statusCode, message, errorSources };
};
export default zodErrorHandler;
