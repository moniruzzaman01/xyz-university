import { Response, Request, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (zodSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await zodSchema.parseAsync({
        body: req.body,
      });

      next();
    } catch (err) {
      // if (err instanceof ZodError) {
      //   return res.status(400).json({
      //     message: "Validation error",
      //     errors: err.errors,
      //   });
      // }
      next(err);
    }
  };
};

export default validateRequest;
