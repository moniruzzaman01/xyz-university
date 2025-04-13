import { Request, Response } from "express";
import { createAnUserToDB } from "./user.service";
import { z } from "zod";
import { userValidation } from "./user.validation";

const createAnUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    //zod validation
    const validation = userValidation.safeParse(userData);

    if (validation.success) {
      const result = await createAnUserToDB(validation.data);
      res.status(200).json({
        success: true,
        message: "user created successfully!",
        data: result,
      });
    } else {
      res.status(400).json({
        success: true,
        message: "user validation failed!",
        data: validation.error,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "something went wrong!",
      error: error.message,
    });
  }
};

export default { createAnUser };
