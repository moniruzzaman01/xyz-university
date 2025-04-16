import { Router } from "express";
import deptController from "./dept.controller";
import validateRequest from "../../middlewares/validateRequest";
import { deptValidation } from "./dept.validation";

const deptRouter = Router();

deptRouter.post(
  "/create-a-department",
  validateRequest(deptValidation.createDeptValidationSchema),
  deptController.createADept
);
deptRouter.get("/", deptController.getAllDepts);
deptRouter.get("/:id", deptController.getADept);
deptRouter.patch(
  "/:id",
  validateRequest(deptValidation.updateDeptValidationSchema),
  deptController.updateADept
);

export default deptRouter;
