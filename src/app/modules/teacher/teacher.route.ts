import { Router } from "express";
import teacherController from "./teacher.controller";
import validateRequest from "../../middlewares/validateRequest";
import { teacherValidation } from "./teacher.validation";

const teacherRouter = Router();

teacherRouter.get("/", teacherController.getAllTeacher);
teacherRouter.get("/:id", teacherController.getATeacher);
teacherRouter.patch(
  "/:id",
  validateRequest(teacherValidation.updateTeacherValidationSchema),
  teacherController.updateATeacher
);
teacherRouter.delete("/:id", teacherController.deleteATeacher);

export default teacherRouter;
