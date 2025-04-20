import catchAsync from "../../utils/catchAsync";
import { adminServices } from "./admin.service";

const getAllAdmin = catchAsync(async (req, res, _next) => {
  const result = await adminServices.getAllAdminFromDB(req.query);
  res.status(200).json({
    success: true,
    message: result ? "all admin data fetched successfully!" : "No data found!",
    data: result,
  });
});

const getAnAdmin = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const result = await adminServices.getAnAdminFromDB(id);
  res.status(200).json({
    success: true,
    message: result
      ? "single admin data fetched successfully!"
      : "No data found!",
    data: result,
  });
});

const deleteAnAdmin = catchAsync(async (req, res, _next) => {
  const { id } = req.params;
  const result = await adminServices.deleteAnAdminFromDB(id);
  res.status(200).json({
    success: true,
    message: result
      ? "admin data deleted successfully!"
      : "something went wrong!",
    data: result,
  });
});

export default {
  getAllAdmin,
  getAnAdmin,
  deleteAnAdmin,
};
