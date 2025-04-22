import catchAsync from "../../utils/catchAsync";
import { srService } from "./sr.service";

const createSemesterRegistration = catchAsync(async (req, res, _next) => {
  const insertedData = await srService.createSemesterRegistrationIntoDB(
    req.body
  );
  res.status(200).json({
    success: true,
    message: "semester registration successfull!",
    data: insertedData,
  });
});

export default {
  createSemesterRegistration,
};
