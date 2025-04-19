import { userServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const createAStudent = catchAsync(async (req, res, _next) => {
  const { password, student } = req.body;
  const result = await userServices.createAStudentIntoDB(password, student);
  res.status(200).json({
    success: true,
    message: "student user created successfully!",
    data: result,
  });
});

const createATeacher = catchAsync(async (req, res, _next) => {
  const { password, teacher } = req.body;
  const result = await userServices.createATeacherIntoDB(password, teacher);
  res.status(200).json({
    success: true,
    message: "teacher user created successfully",
    data: result,
  });
});

export default { createAStudent, createATeacher };
