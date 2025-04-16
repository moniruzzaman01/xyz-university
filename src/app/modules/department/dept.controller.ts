import catchAsync from "../../utils/catchAsync";
import { deptService } from "./dept.service";

const createADept = catchAsync(async (req, res, _next) => {
  const deptData = req.body;
  const newDept = await deptService.createADeptIntoDB(deptData);
  res.status(200).json({
    success: true,
    message: "new department created successfully!",
    data: newDept,
  });
});

export = {
  createADept,
};
