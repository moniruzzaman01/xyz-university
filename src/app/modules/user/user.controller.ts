import { userServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const createAStudent = catchAsync(async (req, res, _next) => {
  const { password, student } = req.body;
  const result = await userServices.createAStudentIntoDB(password, student);
  res.status(200).json({
    success: true,
    message: "user created successfully!",
    data: result,
  });
});

export default { createAStudent };
