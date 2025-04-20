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

const getACourse = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const singleCourse = await courseServices.getACourseFromDB(id);
  res.status(200).json({
    success: true,
    message: "single course fetched successfully!",
    data: singleCourse,
  });
});

const deleteACourse = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const deletedData = await courseServices.deleteACourseFromDB(id);
  res.status(200).json({
    success: true,
    message: "single course deleted successfully!",
    data: deletedData,
  });
});

export default {
  createACourse,
  getAllCourses,
  getACourse,
  deleteACourse,
};
