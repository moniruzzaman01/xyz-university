import catchAsync from "../../utils/catchAsync";
import { teacherServices } from "./teacher.service";

const getAllTeacher = catchAsync(async (req, res, _next) => {
  const allStudents = await teacherServices.getAllTeacherFromDB(req.query);
  res.status(200).json({
    success: true,
    message: "all teachers data fetched successfully!",
    data: allStudents,
  });
});

const getATeacher = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const singleTeacher = await teacherServices.getATeacherFromDB(id);
  res.status(200).json({
    success: true,
    message: singleTeacher
      ? "single teacher data fetched successfully!"
      : "No data found!",
    data: singleTeacher,
  });
});

const updateATeacher = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const updatedData = await teacherServices.updateATeacherFromDB(id, req.body);
  res.status(200).json({
    success: true,
    message: updatedData
      ? "teacher data updated successfully!"
      : "Something went wrong!",
    data: updatedData,
  });
});

const deleteATeacher = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const deletedData = await teacherServices.deleteATeacherFromDB(id);
  res.status(200).json({
    success: true,
    message: deletedData
      ? "teacher data deleted successfully!"
      : "Something went wrong!",
    data: deletedData,
  });
});

export default {
  getAllTeacher,
  getATeacher,
  deleteATeacher,
  updateATeacher,
};
