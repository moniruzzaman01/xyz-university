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

export default {
  getAllTeacher,
};
