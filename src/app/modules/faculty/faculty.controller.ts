import { isValidObjectId } from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { facultyService } from "./faculty.service";

const createAFaculty = catchAsync(async (req, res, _next) => {
  const facultyData = req.body;
  const newFaculty = await facultyService.createAFacultyIntoDB(facultyData);
  res.status(200).json({
    success: true,
    message: "new faculty created successfully!",
    data: newFaculty,
  });
});
const getAllFaculties = catchAsync(async (req, res, _next) => {
  const allFaculties = await facultyService.getAllFacultiesFromDB();
  res.status(200).json({
    success: true,
    message: "all faculties are fetched successfully!",
    data: allFaculties,
  });
});
const getAFaculty = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const singleFaculty = await facultyService.getAFacultyFromDB(id);
  res.status(200).json({
    success: true,
    message: "single faculty data fetched successfully!",
    data: singleFaculty,
  });
});
const updateAFaculty = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new Error("Not a valid objectId!");
  }
  const updatedInfo = await facultyService.updateAFacultyFromDB(id, req.body);
  res.status(200).json({
    success: true,
    message: "successfully update a faculty filtered by id!",
    data: updatedInfo,
  });
});

export = {
  createAFaculty,
  getAllFaculties,
  getAFaculty,
  updateAFaculty,
};
