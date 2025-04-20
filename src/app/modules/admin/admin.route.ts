import { Router } from "express";
import adminController from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminValidation } from "./admin.validation";

const adminRouter = Router();

adminRouter.get("/", adminController.getAllAdmin);
adminRouter.get("/:id", adminController.getAnAdmin);
adminRouter.delete("/:id", adminController.deleteAnAdmin);
adminRouter.patch(
  "/:id",
  validateRequest(adminValidation.updateAdminValidationSchema),
  adminController.updateAnAdmin
);

export default adminRouter;
