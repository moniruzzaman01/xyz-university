import catchAsync from "../../utils/catchAsync";
import { courseServices } from "./course.service";

const createACourse = catchAsync(async (req, res, _next) => {
  const newCourse = await courseServices.createACourseIntoDB(req.body);
  res.status(200).json({
    success: true,
    message: "new course created successfully!",
    data: newCourse,
  });
});

const getAllCourses = catchAsync(async (req, res, _next) => {
  const allCourses = await courseServices.getAllCoursesFromDB(req.query);
  res.status(200).json({
    success: true,
    message: "all courses fetched successfully!",
    data: allCourses,
  });
});

export default {
  createACourse,
  getAllCourses,
};
