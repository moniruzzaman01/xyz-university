import { Request, Response } from "express";
import { studentServices } from "./student.service";

const getAllStudents = async (_req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "All students fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "something went wrong!",
      error: error.message,
    });
  }
};
export = {
  getAllStudents,
};
