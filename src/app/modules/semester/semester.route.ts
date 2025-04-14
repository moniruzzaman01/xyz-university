import { Router } from "express";
import semesterController from "./semester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { semesterValidation } from "./semester.validation";

const semesterRouter = Router();

semesterRouter.post(
  "/create-a-semester",
  validateRequest(semesterValidation.createSemesterValidationSchema),
  semesterController.createASemester
);

export default semesterRouter;
