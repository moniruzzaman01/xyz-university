import catchAsync from "../../utils/catchAsync";
import { facultyService } from "./faculty.service";

const createAFaculty = catchAsync(async (req, res, _next) => {
  const facultyData = req.body;
  const newFaculty = await facultyService.createAFacultyIntoDB(facultyData);
  res.status(200).json({
    success: true,
    message: "new semester created successfully!",
    data: newFaculty,
  });
});

export = {
  createAFaculty,
};
