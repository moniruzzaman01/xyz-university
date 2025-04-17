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
const deleteAStudent = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const result = await studentServices.deleteAStudentFromDB(id);
  res.status(200).json({
    success: true,
    message: "student deleted successfully!",
    data: result,
  });
});

export = {
  getAllStudents,
  deleteAStudent,
};
