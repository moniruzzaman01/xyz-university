import { isValidObjectId } from "mongoose";
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
const getAllDepts = catchAsync(async (req, res, _next) => {
  const allDepts = await deptService.getAllDeptsFromDB();
  res.status(200).json({
    success: true,
    message: "all department fetched successfully!",
    data: allDepts,
  });
});
const getADept = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const singleDept = await deptService.getADeptFromDB(id);
  res.status(200).json({
    success: true,
    message: "single department fetched successfully!",
    data: singleDept,
  });
});
const updateADept = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw new Error("not a valid objectId!");
  }
  const updatedInfo = await deptService.updateADeptFromDB(id, req.body);
  if (!updatedInfo) {
    res.status(404).json({
      success: false,
      message: `couldn't find the department data using the id:${id}`,
    });
  } else {
    res.status(200).json({
      success: true,
      message: "department data updated successfully!",
      data: updatedInfo,
    });
  }
});

export = {
  createADept,
  getAllDepts,
  getADept,
  updateADept,
};
