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

export default { createASemester };
