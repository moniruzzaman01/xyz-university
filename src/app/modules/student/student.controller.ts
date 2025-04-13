import { NextFunction, Request, Response } from "express";
import { studentServices } from "./student.service";

const getAllStudents = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "All students fetched successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export = {
  getAllStudents,
};
