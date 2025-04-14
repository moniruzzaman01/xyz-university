import { isValidObjectId } from "mongoose";
import catchAsync from "../../utils/catchAsync";
import { semesterServices } from "./semester.service";

const createASemester = catchAsync(async (req, res, _next) => {
  const semesterData = req.body;
  const newSemester = await semesterServices.createASemesterIntoDB(
    semesterData
  );
  res.status(200).json({
    success: true,
    message: "new semester created successfully!",
    data: newSemester,
  });
});

const getAllSemesters = catchAsync(async (_req, res, _next) => {
  const allSemesters = await semesterServices.getAllSemestersFromDB();
  res.status(200).json({
    success: true,
    message: "all semesters fetched successfully!",
    data: allSemesters,
  });
});

const getASemester = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new Error("Not a valid objectId!");
  }
  const singleSemester = await semesterServices.getASemesterFromDB(id);
  res.status(200).json({
    success: true,
    message: "successfully fetched a semester filtered by id!",
    data: singleSemester,
  });
});

const updateASemester = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new Error("Not a valid objectId!");
  }

  const updatedInfo = await semesterServices.updateASemesterFromDB(
    id,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "successfully update a semester filtered by id!",
    data: updatedInfo,
  });
});

export default {
  createASemester,
  getAllSemesters,
  getASemester,
  updateASemester,
};
