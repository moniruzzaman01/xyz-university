import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";

const createAStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student } = req.body;
    const result = await userServices.createAStudentIntoDB(password, student);
    res.status(200).json({
      success: true,
      message: "user created successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default { createAStudent };
