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
const getAStudent = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const result = await studentServices.getAStudentFromDB(id);
  res.status(200).json({
    success: true,
    message: "single student fetched successfully!",
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
const updateAStudent = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await studentServices.updateAStudentIntoDB(id, student);
  res.status(200).json({
    success: true,
    message: "student updated successfully!",
    data: result,
  });
});

export = {
  getAllStudents,
  deleteAStudent,
  updateAStudent,
  getAStudent,
};
