import { Router } from "express";
import semesterController from "./semester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { semesterValidation } from "./semester.validation";

const semesterRouter = Router();

semesterRouter.get("/", semesterController.getAllSemesters);
semesterRouter.post(
  "/create-a-semester",
  validateRequest(semesterValidation.createSemesterValidationSchema),
  semesterController.createASemester
);
semesterRouter.get("/:id", semesterController.getASemester);
semesterRouter.patch(
  "/:id",
  validateRequest(semesterValidation.updateSemesterValidationSchema),
  semesterController.updateASemester
);

export default semesterRouter;
