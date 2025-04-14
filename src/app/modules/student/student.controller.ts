import { studentServices } from "./student.service";
import catchAsync from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (_req, res, _next) => {
  const result = await studentServices.getAllStudentsFromDB();
  res.status(200).json({
    success: true,
    message: "All students fetched successfully!",
    data: result,
  });
});

export = {
  getAllStudents,
};
