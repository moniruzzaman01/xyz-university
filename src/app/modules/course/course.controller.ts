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
    message: "course deleted successfully!",
    data: deletedData,
  });
});

const updateACourse = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const updatedData = await courseServices.updateACourseFromDB(id, req.body);
  res.status(200).json({
    success: true,
    message: "course updated successfully!",
    data: updatedData,
  });
});

const assignTeachersInCourse = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const insertedData = await courseServices.assignTeachersInCourseIntoDB(
    id,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "assign teachers in course successfully!",
    data: insertedData,
  });
});

const removeTeachersFromCourse = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const updatedData = await courseServices.removeTeachersFromCourseFromDB(
    id,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "remove teachers in course successfully!",
    data: updatedData,
  });
});

export default {
  createACourse,
  getAllCourses,
  getACourse,
  deleteACourse,
  updateACourse,
  assignTeachersInCourse,
  removeTeachersFromCourse,
};
